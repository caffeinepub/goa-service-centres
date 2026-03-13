import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitServiceRequest } from "@/hooks/useQueries";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function ServiceFormPage() {
  const { serviceName } = useParams({ from: "/service/$serviceName" });
  const navigate = useNavigate();
  const decodedName = decodeURIComponent(serviceName);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [problem, setProblem] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mutation = useSubmitServiceRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !problem.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await mutation.mutateAsync({
        serviceName: decodedName,
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        problemDescription: problem.trim(),
      });
      setSubmitted(true);
      toast.success("Service request submitted!");
      setName("");
      setPhone("");
      setAddress("");
      setProblem("");
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-2xl py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">All Services</span>
          </button>

          <div className="mb-8">
            <div className="inline-block bg-primary/15 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3 tracking-wide uppercase">
              Book a Repair
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {decodedName}
            </h1>
            <p className="text-muted-foreground mt-2">
              Fill in your details and we&apos;ll dispatch a technician to you.
            </p>
          </div>

          {submitted && (
            <motion.div
              data-ocid="service_form.success_state"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 mb-6"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-semibold">Request Submitted!</p>
                <p className="text-sm opacity-80">
                  Our team will contact you within 30 minutes.
                </p>
              </div>
            </motion.div>
          )}

          {mutation.isError && (
            <div
              data-ocid="service_form.error_state"
              className="bg-destructive/10 border border-destructive/30 text-destructive rounded-xl p-4 mb-6 text-sm"
            >
              Something went wrong. Please try again.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xs space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                data-ocid="service_form.input"
                placeholder="e.g. Rahul Fernandes"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                data-ocid="service_form.phone.input"
                type="tel"
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="font-medium">
                Address
              </Label>
              <Input
                id="address"
                data-ocid="service_form.address.input"
                placeholder="e.g. 12, Calangute Beach Road, North Goa"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="problem" className="font-medium">
                Problem Description
              </Label>
              <Textarea
                id="problem"
                data-ocid="service_form.textarea"
                placeholder="Describe the issue — e.g. AC not cooling, making loud noise..."
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                required
                rows={4}
                className="resize-none"
              />
            </div>

            {mutation.isPending && (
              <div
                data-ocid="service_form.loading_state"
                className="flex items-center gap-2 text-muted-foreground text-sm"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting your request...
              </div>
            )}

            <Button
              type="submit"
              data-ocid="service_form.submit_button"
              disabled={mutation.isPending}
              className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-amber"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />{" "}
                  Submitting...
                </>
              ) : (
                "Register Service Call"
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
