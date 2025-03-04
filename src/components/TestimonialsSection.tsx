
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  // image: string ;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Anjali Gupta",
    location: "Gachibowli",
    rating: 5,
    text: "Varahi journey made my Char Dham Yatra so easy! From food to hotels, everything was perfect. The guides were knowledgeable and friendly. I'll definitely recommend them to my friends and family.",
    // image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 2,
    name: "Ravi Mehta",
    location: "Hyderabad",
    rating: 5,
    text: "The best travel agency for Kedarnath! They took care of my elderly parents so well. The helicopter service was smooth, and the accommodation was excellent. Thank you for the wonderful experience!",
    // image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 3,
    name: "Meera Sharma",
    location: "Dilsukhnagar",
    rating: 5,
    text: "Our Char Dham journey with Varahi journey was truly divine. Their attention to detail and personalized service made this spiritual trip unforgettable. The team went above and beyond at every step.",
    // image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  },
  {
    id: 4,
    name: "Arjun Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Professional, punctual, and perfect planning! Varahi journey managed everything seamlessly during our 10-day Char Dham Yatra. The accommodations were comfortable and the food was excellent.",
    // image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: activeIndex * scrollContainerRef.current.offsetWidth,
        behavior: "smooth"
      });
    }
  }, [activeIndex]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / containerWidth);
      
      setActiveIndex(newIndex);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section className="section-padding bg-himalaya-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold-100 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-100 rounded-full opacity-30 translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-himalaya-800 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-himalaya-600">
            Don't just take our word for it. Hear from pilgrims who experienced our services firsthand during their sacred journey.
          </p>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <div className="flex transition-transform duration-300" style={{ width: `${testimonials.length * 100}%` }}>
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full" 
                  style={{ flex: `0 0 ${100 / testimonials.length}%` }}
                >
                  <div className="glass-card rounded-xl p-8 mx-4 md:mx-12 lg:mx-24 h-full">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      {/* <div className="flex-shrink-0">
                        <img 
                          // src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                        />
                      </div> */}
                      <div className="flex-grow">
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-5 h-5 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-himalaya-700 text-lg mb-4 italic">"{testimonial.text}"</p>
                        <div>
                          <h4 className="text-himalaya-800 font-semibold">{testimonial.name}</h4>
                          <p className="text-himalaya-600 text-sm">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 px-4">
            <Button
              onClick={prevTestimonial}
              size="icon"
              variant="outline"
              className="rounded-full border-himalaya-200 bg-white shadow-sm hover:bg-himalaya-50"
            >
              <ArrowLeft className="h-5 w-5 text-himalaya-700" />
            </Button>
            <Button
              onClick={nextTestimonial}
              size="icon"
              variant="outline"
              className="rounded-full border-himalaya-200 bg-white shadow-sm hover:bg-himalaya-50"
            >
              <ArrowRight className="h-5 w-5 text-himalaya-700" />
            </Button>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index 
                    ? 'bg-primary w-6' 
                    : 'bg-himalaya-300 hover:bg-himalaya-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* <div className="mt-12 text-center">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            See More Reviews
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default TestimonialsSection;
