import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2 } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image_url: string | null;
  date: string;
  excerpt: string;
  content: string;
}

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      (supabase as any)
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle()
        .then(({ data, error }: any) => {
          if (!error && data) setPost(data);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <PageLayout>
        <div className="py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <div className="py-16 text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:text-accent transition-colors font-semibold">← Back to Blog</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <span className="block text-xs text-muted-foreground font-body mb-2">{post.date}</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">{post.title}</h1>
          {post.image_url && (
            <img src={post.image_url} alt={post.title} className="w-full h-64 md:h-80 object-cover rounded mb-8" />
          )}
          <div className="prose max-w-none">
            {post.content?.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground mt-4 first:mt-0">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPostPage;
