import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // Verify admin auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: claims, error: claimsError } = await supabaseUser.auth.getUser();
    if (claimsError || !claims.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check admin role
    const { data: isAdmin } = await supabaseAdmin.rpc("has_role", {
      _user_id: claims.user.id,
      _role: "admin",
    });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const {
      application_id,
      feedback,
      webinar_link,
      webinar_date,
      webinar_description,
    } = await req.json();

    if (!application_id) {
      return new Response(JSON.stringify({ error: "application_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get application
    const { data: app, error: appErr } = await supabaseAdmin
      .from("applications")
      .select("*")
      .eq("id", application_id)
      .single();

    if (appErr || !app) {
      return new Response(JSON.stringify({ error: "Application not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create invitation token
    const { data: invitation, error: invErr } = await supabaseAdmin
      .from("invitation_tokens")
      .insert({
        application_id: app.id,
        email: app.email,
        webinar_link: webinar_link || null,
        webinar_description: webinar_description || null,
        webinar_date: webinar_date || null,
      })
      .select()
      .single();

    if (invErr) {
      console.error("Invitation insert error:", invErr);
      return new Response(JSON.stringify({ 
        error: invErr.message,
        details: invErr.details,
        hint: invErr.hint
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Update application status
    await supabaseAdmin
      .from("applications")
      .update({
        status: "invited",
        admin_feedback: feedback || "Congratulations! You have been selected for the next stage of the recruitment process.",
      })
      .eq("id", application_id);

    // Generate invitation URL
    const siteUrl = req.headers.get("origin") || "https://infiniteinsight.net";
    const invitationUrl = `${siteUrl}/invitation?token=${invitation.token}`;

    // Format the webinar date nicely if it exists
    const formattedDate = webinar_date 
      ? new Date(webinar_date).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })
      : 'To be announced';

    // Create beautiful HTML email template with button
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Interview Invitation</title>
      </head>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">🎉 Congratulations!</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Hello <strong>${app.first_name || 'Applicant'} ${app.last_name || ''}</strong>,</p>
                    
                    <p style="font-size: 16px; margin-bottom: 20px;">${feedback || "We are pleased to inform you that you have been selected for the next stage of our recruitment process."}</p>
                    
                    <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                      <h3 style="margin-top: 0; color: #333; font-size: 18px;">📋 Next Steps:</h3>
                      <p style="margin-bottom: 10px;">To proceed with your application, you need to:</p>
                      <ol style="margin-bottom: 0;">
                        <li style="margin-bottom: 8px;">Complete your verification by paying <strong>KSH 92</strong></li>
                        <li style="margin-bottom: 8px;">Upload your updated CV</li>
                        <li style="margin-bottom: 0;">Access the webinar/interview link</li>
                      </ol>
                    </div>
                    
                    <!-- Webinar Details (if provided) -->
                    ${webinar_link ? `
                      <div style="background-color: #e8f4fd; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                        <h3 style="margin-top: 0; color: #0369a1; font-size: 18px;">🎥 Webinar/Interview Details:</h3>
                        <p style="margin-bottom: 8px;"><strong>Date & Time:</strong> ${formattedDate}</p>
                        <p style="margin-bottom: 8px;"><strong>Description:</strong> ${webinar_description || 'Please join our online interview session.'}</p>
                        <p style="margin-bottom: 0;"><strong>Note:</strong> The webinar link will be accessible after completing your verification.</p>
                      </div>
                    ` : ''}
                    
                    <!-- Call to Action Button -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 20px 0;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td align="center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50px;">
                                <a href="${invitationUrl}" style="display: inline-block; padding: 14px 40px; font-size: 16px; color: #ffffff; text-decoration: none; font-weight: 600; letter-spacing: 0.5px;">✅ Complete Your Verification</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="font-size: 14px; color: #666; text-align: center; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
                      This link will expire in 7 days. Please complete your verification before then.
                    </p>
                    
                    <p style="font-size: 14px; color: #999; text-align: center; margin-top: 10px;">
                      If you're having trouble clicking the button, copy and paste this URL into your browser:<br>
                      <span style="color: #667eea; word-break: break-all;">${invitationUrl}</span>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 40px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e0e0e0;">
                    <p style="margin: 0; font-size: 14px; color: #666;">
                      This is an automated message from Infinite Insight Recruitment Team.<br>
                      Please do not reply to this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const plainText = `
Congratulations ${app.first_name || 'Applicant'} ${app.last_name || ''}!

${feedback || "We are pleased to inform you that you have been selected for the next stage of our recruitment process."}

NEXT STEPS:
1. Complete your verification by paying KSH 92
2. Upload your updated CV
3. Access the webinar/interview link

${webinar_link ? `WEBINAR DETAILS:
Date & Time: ${formattedDate}
Description: ${webinar_description || 'Please join our online interview session.'}
Note: The webinar link will be accessible after completing your verification.
` : ''}

Click here to complete your verification: ${invitationUrl}

This link will expire in 7 days. Please complete your verification before then.

Best regards,
Infinite Insight Recruitment Team
    `;

    // Send email using Brevo SMTP
    const smtpClient = new SmtpClient();
    
    try {
      // Connect to Brevo SMTP server
      await smtpClient.connectTLS({
        hostname: Deno.env.get("BREVO_SMTP_HOST")!,
        port: parseInt(Deno.env.get("BREVO_SMTP_PORT")!),
        username: Deno.env.get("BREVO_SMTP_USER")!,
        password: Deno.env.get("BREVO_SMTP_PASSWORD")!,
      });

      // Send the email
      await smtpClient.send({
        from: "Infinite Insight Recruitment <9f8613001@smtp-brevo.com>", // You can change this to your verified domain email
        to: app.email,
        subject: "🎉 Interview Invitation - Complete Your Verification",
        content: plainText,
        html: emailHTML,
      });

      // Close the connection
      await smtpClient.close();
      
      console.log("Email sent successfully via Brevo SMTP");
      
    } catch (emailError) {
      console.error("Error sending email via Brevo SMTP:", emailError);
      
      // Close connection if open
      try { await smtpClient.close(); } catch { /* ignore */ }
      
      // Return partial success but notify admin
      return new Response(
        JSON.stringify({
          success: true,
          warning: "Invitation created but email failed to send",
          invitation: {
            token: invitation.token,
            url: invitationUrl,
            email: app.email,
          },
          message: `✅ Invitation created but email delivery failed. Please share manually: ${invitationUrl}`,
          error: emailError.message
        }),
        { 
          status: 207, // Partial success
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        invitation: {
          token: invitation.token,
          url: invitationUrl,
          email: app.email,
          name: `${app.first_name || ''} ${app.last_name || ''}`.trim() || app.email,
        },
        message: `✅ Invitation sent successfully to ${app.email}!`,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
