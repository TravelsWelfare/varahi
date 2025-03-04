import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogPosts, categories } from "@/data/blogPosts";
import type { BlogPost } from "@/data/blogPosts";

// Categories for filter
const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handleReadMore = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Char Dham Yatra Blog | Expert Travel Tips & Spiritual Guides</title>
        <meta 
          name="description" 
          content="Comprehensive guide for Char Dham Yatra including Kedarnath, Badrinath, Yamunotri, and Gangotri temples. Expert travel tips, spiritual insights, and practical advice."
        />
        <meta 
          name="keywords" 
          content="char dham yatra, kedarnath temple, badrinath temple, yamunotri temple, gangotri temple, uttarakhand pilgrimage, char dham guide"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Char Dham Yatra Blog",
            "description": "Expert travel guides and spiritual insights for Char Dham Yatra",
            "url": "https://your-domain.com/blog",
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
      <main>
        {/* Page Header */}
        {/* <div className="pt-20 bg-gradient-to-b from-himalaya-50 to-white">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-himalaya-800">
              Our Travel Blog
            </h1>
            <p className="text-himalaya-600 max-w-3xl mx-auto mt-4">
              Expert insights, travel tips, and spiritual guidance to help you plan your perfect Char Dham Yatra.
            </p>
          </div>
        </div> */}

        {/* Blog Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button 
                key={category} 
                variant={category === selectedCategory ? "default" : "outline"} 
                className="mb-2"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img 
                src={filteredPosts[0].image} 
                alt={filteredPosts[0].title} 
                className="w-full h-[450px] object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-medium rounded-full mb-4">
                  {filteredPosts[0].category}
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-3">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-gray-200 mb-6 max-w-3xl">
                  {filteredPosts[0].excerpt}
                </p>
                <div className="flex items-center text-gray-300 text-sm gap-4 mb-5">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{filteredPosts[0].date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{filteredPosts[0].author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{filteredPosts[0].readTime}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleReadMore(filteredPosts[0].slug)}
                  aria-label={`Read full article about ${filteredPosts[0].title}`}
                >
                  Read Full Article
                </Button>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-52 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-himalaya-100 text-himalaya-800 text-xs font-medium rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="font-display font-bold text-xl text-himalaya-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm gap-4 mb-5">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Button 
                    variant="link" 
                    className="p-0 flex items-center gap-1 text-primary hover:text-primary/80"
                    onClick={() => handleReadMore(post.slug)}
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read More <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="default" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 bg-himalaya-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-display font-bold text-himalaya-800 mb-3">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get the latest travel tips, package offers, and spiritual insights delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow"
              />
              <Button 
                onClick={() => {
                  setIsSubscribing(true);
                  // Add your subscription logic here
                  setTimeout(() => setIsSubscribing(false), 1000);
                  setEmail("");
                }}
                disabled={isSubscribing || !email}
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
