import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { blogPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Calendar, User, Clock } from "lucide-react";
import { useEffect } from "react";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(post => post.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate('/blog'); // Redirect to blog listing if post not found
    }
  }, [post, navigate]);

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{post.title} | Char Dham Yatra Guide</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords.join(", ")} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "image": post.image,
            "publisher": {
              "@type": "Organization",
              "name": "Varahi journey",
              "logo": {
                "@type": "ImageObject",
                "url": "https://your-domain.com/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      <main className="pt-20">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-himalaya-800 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-600 gap-4 mb-8">
            <span className="flex items-center gap-1">
              <Calendar size={16} /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User size={16} /> {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} /> {post.readTime}
            </span>
          </div>
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPost;
