import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import blogRwanda from "@/assets/blog-rwanda.jpg";
import blogConference from "@/assets/blog-conference.jpg";
import blogUganda from "@/assets/blog-uganda.jpg";
import blogWebinar from "@/assets/blog-webinar.jpg";
import blogData from "@/assets/blog-data.jpg";

const blogPosts = [
  {
    slug: "conducting-social-research-in-rwanda",
    image: blogRwanda,
    title: "Conducting Social Research in Rwanda",
    date: "February 2026",
    excerpt: "Rwanda is a beautiful country, known for its rolling hills. Its cities and rural family homesteads are well kept and clean. The research landscape is growing rapidly with increased demand for social and market research across the region.",
  },
  {
    slug: "esomar-2026-conference-nairobi",
    image: blogConference,
    title: "Update from ESOMAR 2026 Conference in Nairobi",
    date: "February 2026",
    excerpt: "Africa 2026 was a powerful moment for our industry — bringing together researchers from across the continent to share insights, methodologies, and visions for the future of market research in Africa.",
  },
  {
    slug: "quantitative-field-work-uganda",
    image: blogUganda,
    title: "Performing Quantitative Field Work in Uganda",
    date: "September 2025",
    excerpt: 'Greetings from Uganda — also known as the "Pearl of Africa". As one of the top destinations in East Africa, Uganda presents unique opportunities and challenges for field researchers.',
  },
  {
    slug: "msra-ethics-webinar",
    image: blogWebinar,
    title: "Upcoming MSRA Ethics Webinar",
    date: "October 2025",
    excerpt: "This post is a reminder for all Infinite Insight staff as well as our field interviewers who are registered MSRA members about the upcoming ethics webinar.",
  },
  {
    slug: "data-analysis-training-whatsapp",
    image: blogData,
    title: "Data Analysis & Analytics Training via WhatsApp",
    date: "September 2025",
    excerpt: "This valuable training info was posted to our private group chat by Naftali, our Research Director (Quant). The course covers practical data analysis techniques.",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12">Blog</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.slug} className="group">
                <article>
                  <div className="overflow-hidden rounded mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-body">{post.date}</span>
                  <h3 className="text-lg font-heading font-bold text-primary group-hover:text-accent transition-colors mb-2 mt-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="inline-block mt-2 text-sm text-primary font-semibold group-hover:text-accent transition-colors">
                    Read more →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export { blogPosts };
export default BlogPage;
