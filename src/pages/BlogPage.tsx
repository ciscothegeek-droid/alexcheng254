import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image_url: string | null;
  date: string;
  excerpt: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase as any)
      .from("blog_posts")
      .select("id, slug, title, image_url, date, excerpt")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }: any) => {
        if (!error && data) setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <PageLayout>
      <div className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12">Blog</h1>
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" /> Loading...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.slug} className="group">
                  <article>
                    {post.image_url && (
                      <div className="overflow-hidden rounded mb-4">
                        <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground font-body">{post.date}</span>
                    <h3 className="text-lg font-heading font-bold text-primary group-hover:text-accent transition-colors mb-2 mt-1">{post.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <span className="inline-block mt-2 text-sm text-primary font-semibold group-hover:text-accent transition-colors">Read more →</span>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPage;
