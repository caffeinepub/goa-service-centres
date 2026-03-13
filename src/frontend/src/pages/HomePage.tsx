import { useNavigate } from "@tanstack/react-router";
import {
  AirVent,
  ChevronRight,
  Clock,
  Droplets,
  MapPin,
  Microwave,
  PhoneCall,
  Refrigerator,
  WashingMachine,
} from "lucide-react";
import { type Variants, motion } from "motion/react";

const services = [
  {
    id: 1,
    name: "AC Repair",
    icon: AirVent,
    desc: "Split, window & central AC systems",
    color: "from-blue-50 to-sky-50",
  },
  {
    id: 2,
    name: "Refrigerator Repair",
    icon: Refrigerator,
    desc: "Single & double door refrigerators",
    color: "from-cyan-50 to-teal-50",
  },
  {
    id: 3,
    name: "Washing Machine Repair",
    icon: WashingMachine,
    desc: "Top load & front load machines",
    color: "from-indigo-50 to-violet-50",
  },
  {
    id: 4,
    name: "Microwave Repair",
    icon: Microwave,
    desc: "All brands, solo & convection",
    color: "from-orange-50 to-amber-50",
  },
  {
    id: 5,
    name: "Water Purifier Repair",
    icon: Droplets,
    desc: "RO, UV & UF filter systems",
    color: "from-emerald-50 to-green-50",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main>
      {/* Hero */}
      <section className="hero-pattern py-16 md:py-24">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4 tracking-wide">
              Trusted Since 2010 &middot; Goa, India
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Expert Appliance
              <br />
              <span className="text-primary">Repair Services</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
              Fast, reliable home appliance repairs across North &amp; South
              Goa. Certified technicians at your doorstep.
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-primary" /> Same-day service
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" /> 6 AM &ndash; 9 PM
                daily
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" /> All areas in Goa
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Choose a Service
            </h2>
            <p className="text-muted-foreground">
              Click a card to book your repair
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              const ocid = `services.item.${index + 1}` as const;
              return (
                <motion.button
                  key={service.id}
                  data-ocid={ocid}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  type="button"
                  onClick={() =>
                    navigate({
                      to: "/service/$serviceName",
                      params: { serviceName: encodeURIComponent(service.name) },
                    })
                  }
                  className="group relative bg-card border border-border rounded-xl p-6 text-left cursor-pointer shadow-xs hover:shadow-amber hover:border-primary/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}
                  >
                    <Icon
                      className="w-7 h-7 text-foreground/70"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.desc}
                  </p>
                  <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-muted/50 border-t border-border py-10">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "10,000+", label: "Repairs Done" },
              { num: "4.9\u2605", label: "Customer Rating" },
              { num: "50+", label: "Technicians" },
              { num: "24hr", label: "Warranty on Work" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-bold text-primary">
                  {stat.num}
                </div>
                <div className="text-muted-foreground text-sm mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
