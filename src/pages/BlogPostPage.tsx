import { useParams, Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { blogPosts } from "./BlogPage";
import { ArrowLeft } from "lucide-react";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="py-16 text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:text-accent transition-colors font-semibold">
            ← Back to Blog
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <span className="block text-xs text-muted-foreground font-body mb-2">{post.date}</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">{post.title}</h1>
          <img src={post.image} alt={post.title} className="w-full h-64 md:h-80 object-cover rounded mb-8" />
          <div className="prose max-w-none">
            <p className="text-base leading-relaxed text-foreground">{post.excerpt}</p>
            <p className="text-base leading-relaxed text-foreground mt-4">
              This is a detailed article covering our experiences and insights from this project. Our team of dedicated researchers worked closely with local communities to gather authentic data and deliver actionable insights to our clients.
            </p>
            <p className="text-base leading-relaxed text-foreground mt-4">
              At Infinite Insight, we believe in combining rigorous methodology with deep local understanding. This approach has helped us successfully deliver projects across 30 African markets since our founding in 2010.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default BlogPostPage;
