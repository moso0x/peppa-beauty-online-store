import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

/* Replace these with actual beauty product images later */
import featured_1 from "@/assets/featured/featured-1.jpg";
import featured_2 from "@/assets/featured/featured-2.jpg";
import featured_3 from "@/assets/featured/featured-3.jpg";
import featured_4 from "@/assets/featured/featured-4.jpg";
import featured_5 from "@/assets/featured/featured-5.jpg";
import featured_6 from "@/assets/featured/featured-6.jpg";
import featured_7 from "@/assets/featured/featured-7.jpg";
import featured_8 from "@/assets/featured/featured-8.jpg";
import featured_9 from "@/assets/featured/featured-9.jpg";
import featured_10 from "@/assets/featured/featured-10.jpg";

/* -----------------------------------------
   FEATURED PRODUCT DATA
------------------------------------------ */

const featuredData = [
  {
    title: "Featured Beauty & Skincare Collections",

    images: [
       featured_1,
      featured_2,
      featured_3,
      featured_4,
      featured_5,
      featured_6,
      featured_7,
      featured_8,
       featured_9,
       featured_10,
    
    ],

    description:
      "Explore luxurious skincare essentials formulated to hydrate, nourish, protect and reveal naturally radiant glowing skin.",

    labels: [
      "Vitamin C Serum",
      "Hydrating Face Cream",
      "Glow Facial Oil",
      "Brightening Cleanser",
      "Rose Water Toner",
      "Night Repair Serum",
      "SPF Sun Protection",
      "Body Butter",
      "Lip Care Set",
      "Beauty Gift Collection",
    ],

    points: [
      "Premium skincare for radiant glowing skin",
      "Deep hydration and anti-aging formulas",
      "Brightening solutions for even tone",
      "Daily beauty essentials for healthy routines",
      "Luxury collections and curated gift sets",
    ],
  },
];

/* -----------------------------------------
   MAIN COMPONENT
------------------------------------------ */

export default function FeaturedProductsCarousel() {
  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-rose-50 to-white space-y-16">

      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .8 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-semibold tracking-wide"
          initial={{ opacity:0,y:40 }}
          whileInView={{ opacity:1,y:0 }}
          transition={{ duration:.7, delay:.2 }}
        >
          <span className="text-primary">Skin Care</span> |{" "}
          <span className="text-secondary">Beauty</span> |{" "}
          <span className="text-accent">Glow Essentials</span>
        </motion.h2>

        <motion.p
          className="mt-5 text-muted-foreground max-w-2xl mx-auto leading-8"
          initial={{ opacity:0,y:40 }}
          whileInView={{ opacity:1,y:0 }}
          transition={{ duration:.7, delay:.35 }}
        >
          Discover luxurious skincare products designed for hydration,
          radiance, nourishment and long-lasting beauty.
        </motion.p>

        <motion.div
          className="mt-5 flex justify-center"
          initial={{ opacity:0, scaleX:0 }}
          whileInView={{ opacity:1, scaleX:1 }}
          transition={{ duration:.7, delay:.45 }}
        >
          <div className="w-32 h-1 bg-primary rounded-full" />
        </motion.div>

      </motion.div>


      {featuredData.map((service, index) => (
        <ServiceRow
          key={index}
          service={service}
        />
      ))}

    </section>
  );
}


/* -----------------------------------------
   ROW COMPONENT
------------------------------------------ */

function ServiceRow({ service }: any) {

  const scrollRef = useRef<HTMLDivElement>(null);

  const { ref: viewRef, inView } = useInView({
    threshold: .2,
    triggerOnce: true
  });

  const avalanche = {
    hidden: {
      opacity:0,
      y:60
    },

    visible:(i:number)=>({
      opacity:1,
      y:0,
      transition:{
        duration:.8,
        delay:i*.15,
        ease:[0.25,0.1,0.25,1] as [number,number,number,number]
      }
    })
  };


  const scrollLeft = () =>
    scrollRef.current?.scrollBy({
      left:-300,
      behavior:"smooth"
    });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({
      left:300,
      behavior:"smooth"
    });


  /* Auto-scroll */
  useEffect(()=>{
    const interval=setInterval(()=>{

      if(!scrollRef.current) return;

      const container=scrollRef.current;

      if(
        container.scrollLeft +
        container.offsetWidth >=
        container.scrollWidth
      ){
        container.scrollTo({
          left:0,
          behavior:"smooth"
        });

      }else{
        container.scrollBy({
          left:300,
          behavior:"smooth"
        });
      }

    },5000);

    return()=>clearInterval(interval);

  },[]);



  return(
    <motion.div
      ref={viewRef}
      variants={avalanche}
      initial="hidden"
      animate={inView ? "visible":"hidden"}
      custom={0}
      className="bg-white shadow-xl rounded-[2rem] p-8 max-w-6xl mx-auto"
    >

      {/* TITLE */}
      <motion.h3
        variants={avalanche}
        custom={1}
        className="text-3xl font-semibold mb-4 text-primary"
      >
        {service.title}
      </motion.h3>


      <motion.p
        variants={avalanche}
        custom={2}
        className="text-muted-foreground mb-8 leading-8"
      >
        {service.description}
      </motion.p>


      {/* CAROUSEL */}
      <motion.div
        variants={avalanche}
        custom={3}
        className="relative"
      >

        <motion.button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white rounded-full p-3 shadow-md"
          whileHover={{ scale:1.15 }}
        >
          <ArrowLeft size={20}/>
        </motion.button>


        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth py-4"
        >
          {service.images.map((img:string,i:number)=>(
            <motion.div
              key={i}
              variants={avalanche}
              custom={4+i*.2}
              className="flex-shrink-0 w-52"
            >

              <motion.img
                src={img}
                alt={service.labels[i]}
                className="w-full h-44 rounded-2xl object-cover shadow-lg"
                whileHover={{ scale:1.03 }}
              />

              <p className="text-center mt-3 text-sm font-semibold text-foreground">
                {service.labels[i]}
              </p>

            </motion.div>
          ))}
        </div>


        <motion.button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white rounded-full p-3 shadow-md"
          whileHover={{ scale:1.15 }}
        >
          <ArrowRight size={20}/>
        </motion.button>

      </motion.div>



      {/* POINTS */}
      <motion.ul
        variants={avalanche}
        custom={6}
        className="pt-12 grid md:grid-cols-3 gap-5 text-sm font-semibold"
      >
        {service.points.map((item:string,i:number)=>(
          <motion.li
            key={i}
            variants={avalanche}
            custom={7+i*.1}
            className="flex gap-2"
          >
            <span className="text-primary">
              ✔
            </span>

            <span>
              {item}
            </span>

          </motion.li>
        ))}
      </motion.ul>



      {/* CTA */}
      <motion.div
        variants={avalanche}
        custom={8}
        className="flex justify-center mt-10"
      >

        <Link
          to="/shop"
          className="px-8 py-4 rounded-full bg-primary text-white font-semibold flex items-center gap-2 hover:scale-105 transition"
        >
          Shop Featured Products
          <ArrowRight size={18}/>
        </Link>

      </motion.div>


    </motion.div>
  );
}