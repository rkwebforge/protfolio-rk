import debounce from "lodash.debounce";
import {
  Calendar,
  Check,
  Clock,
  Copy,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import CustomSelect from "./CustomSelect";
import Notification, { NotificationType } from "./Notification";
import { NeonText } from "./Neon";
import { EMAIL, EMAIL_HREF, LOCATION } from "../constants/contact";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
  timeline: string;
}

// The form has no backend yet (submit is simulated), so it's hidden.
// Set to true once a real submission endpoint is wired up.
const SHOW_CONTACT_FORM = false;

const CONTACT = {
  email: EMAIL,
  emailHref: EMAIL_HREF,
  location: LOCATION,
};

interface SocialLink {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  url: string;
  label: string;
}

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 font-display text-sm font-medium text-ink transition-colors hover:bg-accent-strong";
const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-md border border-rule px-5 py-3 font-display text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent";
const iconLink =
  "flex h-11 w-11 items-center justify-center rounded-md border border-rule text-muted transition-colors hover:border-accent hover:text-accent";
const inputBase =
  "w-full rounded-md border bg-raised px-3 py-2.5 text-fg placeholder:text-muted transition-colors focus:border-accent";
const fieldLabel = "mb-2 block text-sm font-medium text-fg";

/** Email-first contact panel, shown while the contact form is disabled. */
const ContactPanel: React.FC<{ socialLinks: SocialLink[] }> = memo(
  ({ socialLinks }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      if (!copied) return;
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }, [copied]);

    const copyEmail = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(CONTACT.email);
        setCopied(true);
      } catch {
        // Clipboard can be blocked (e.g. insecure context); fall back to mail app
        window.location.href = CONTACT.emailHref;
      }
    }, []);

    return (
      <div className="max-w-3xl">
        <div className="rounded-lg border border-rule bg-raised p-5 sm:p-10">
          <p className="text-base text-muted sm:text-lg">
            The quickest way to reach me is email.
          </p>
          <a
            href={CONTACT.emailHref}
            className="mt-2 inline-block rounded-md font-display text-2xl font-medium break-all text-white transition-colors hover:text-accent sm:text-3xl sm:break-normal"
          >
            {CONTACT.email}
          </a>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={CONTACT.emailHref}
              className={`${primaryButton} w-full sm:w-auto`}
            >
              <Mail size={18} aria-hidden="true" />
              Send an email
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className={`${secondaryButton} w-full sm:w-auto`}
            >
              {copied ? (
                <Check
                  size={18}
                  className="text-green-400"
                  aria-hidden="true"
                />
              ) : (
                <Copy size={18} aria-hidden="true" />
              )}
              <span aria-live="polite">
                {copied ? "Copied" : "Copy address"}
              </span>
            </button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <Clock size={16} aria-hidden="true" />I usually reply within 24
            hours.
          </p>

          <div className="mt-8 flex flex-col gap-6 border-t border-rule pt-8 sm:flex-row sm:items-end sm:justify-between">
            <ul className="space-y-3 text-fg">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-muted"
                  aria-hidden="true"
                />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <span>{CONTACT.location}</span>
                  <span className="text-sm text-muted">
                    open to remote work
                  </span>
                </div>
              </li>
            </ul>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={iconLink}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    isVisible: boolean;
    type: NotificationType;
    title: string;
    message?: string;
  }>({
    isVisible: false,
    type: "success",
    title: "",
    message: "",
  });
  const [debouncedSubjectCount, setDebouncedSubjectCount] = useState(0);
  const [debouncedMessageCount, setDebouncedMessageCount] = useState(0);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      budget: "",
      timeline: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = useCallback(
    async (data) => {
      setIsSubmitting(true);

      // Hide any existing notifications
      setNotification((prev) => ({ ...prev, isVisible: false }));

      try {
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Form submitted:", data);

        // Reset form and show success notification
        reset();
        setNotification({
          isVisible: true,
          type: "success",
          title: "Message Sent Successfully!",
          message:
            "Thank you for reaching out! I'll review your message and get back to you within 24 hours.",
        });
      } catch (error) {
        console.error("Form submission error:", error);
        setNotification({
          isVisible: true,
          type: "error",
          title: "Oops! Something went wrong",
          message:
            "Unable to send your message right now. Please try again later or reach out to me directly via email.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [reset, setNotification],
  );

  // Optimized debounced functions with different delays for better UX
  const debouncedSubjectUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSubjectCount(value.length);
      }, 200), // Shorter delay for subject (shorter field)
    [],
  );

  const debouncedMessageUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedMessageCount(value.length);
      }, 300), // Longer delay for message (longer field)
    [],
  );

  // Function to close notification
  const closeNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  }, []);

  // Watch form values for debounced updates
  const subject = useWatch({ control, name: "subject" });
  const message = useWatch({ control, name: "message" });

  useEffect(() => {
    debouncedSubjectUpdate(subject || "");
  }, [subject, debouncedSubjectUpdate]);

  useEffect(() => {
    debouncedMessageUpdate(message || "");
  }, [message, debouncedMessageUpdate]);

  useEffect(() => {
    return () => {
      debouncedSubjectUpdate.cancel();
      debouncedMessageUpdate.cancel();
    };
  }, [debouncedSubjectUpdate, debouncedMessageUpdate]);

  const contactInfo = useMemo(
    () => [
      {
        icon: Mail,
        title: "Email",
        value: CONTACT.email,
        link: CONTACT.emailHref,
        description: "Send me an email anytime",
      },
      {
        icon: MapPin,
        title: "Location",
        value: CONTACT.location,
        link: "#",
        description: "Available for remote work",
      },
    ],
    [],
  );

  const socialLinks = useMemo(
    () => [
      {
        icon: Github,
        url: "https://github.com/rkwebforge",
        label: "GitHub",
      },
      {
        icon: Linkedin,
        url: "https://www.linkedin.com/in/krishnaprasad-r-2261371a3",
        label: "LinkedIn",
      },
    ],
    [],
  );

  const budgetOptions = useMemo(
    () => [
      { value: "under-5k", label: "Under $5,000" },
      { value: "5k-10k", label: "$5,000 - $10,000" },
      { value: "10k-25k", label: "$10,000 - $25,000" },
      { value: "25k-50k", label: "$25,000 - $50,000" },
      { value: "50k-plus", label: "$50,000+" },
    ],
    [],
  );

  const timelineOptions = useMemo(
    () => [
      { value: "asap", label: "ASAP" },
      { value: "1-2-weeks", label: "1-2 weeks" },
      { value: "1-month", label: "1 month" },
      { value: "2-3-months", label: "2-3 months" },
      { value: "3-plus-months", label: "3+ months" },
    ],
    [],
  );

  // Character count calculations using debounced values for display
  const subjectCharCount = `${debouncedSubjectCount}/100 characters`;
  const messageCharCount = `${debouncedMessageCount}/1000 characters`;

  // Form validation using react-hook-form isValid
  const isFormValid = isValid;

  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-24 sm:px-6">
        <div className="mb-12 sm:mb-16">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            <NeonText>Get In Touch</NeonText>
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            I'm always excited to discuss new opportunities, interesting
            projects, or just have a great conversation about technology and
            innovation.
          </p>
        </div>
        {SHOW_CONTACT_FORM ? (
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Information */}
            <div className="space-y-8 lg:col-span-2">
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-white">
                  <NeonText>Let's Connect</NeonText>
                </h2>
                <p className="text-lg leading-relaxed text-fg">
                  Whether you have a project in mind, want to collaborate, or
                  just want to say hello, I'd love to hear from you. Let's
                  create something amazing together!
                </p>
              </div>

              <ul className="divide-y divide-rule border-y border-rule">
                {contactInfo.map((info, index) => (
                  <li key={index}>
                    <a
                      href={info.link}
                      className="group flex items-start gap-4 py-4 transition-colors"
                    >
                      <info.icon
                        size={20}
                        className="mt-0.5 shrink-0 text-muted transition-colors group-hover:text-accent"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 truncate text-base font-semibold text-white">
                          {info.title}
                        </h3>
                        <p className="mb-1 wrap-anywhere text-fg transition-colors group-hover:text-accent">
                          {info.value}
                        </p>
                        <p className="line-clamp-2 text-sm text-muted">
                          {info.description}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Follow Me
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={iconLink}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-rule bg-raised p-6">
                <div className="mb-3 flex items-center gap-3">
                  <MessageCircle size={20} className="text-muted" />
                  <h3 className="text-lg font-semibold text-white">
                    Quick Response
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-fg">
                  I typically respond to emails within 24 hours. For urgent
                  matters, feel free to call me directly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={fieldLabel}>
                      Full Name *
                    </label>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                        maxLength: {
                          value: 50,
                          message: "Name must be less than 50 characters",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          id="name"
                          className={`${inputBase} ${
                            errors.name ? "border-red-400" : "border-rule"
                          }`}
                          placeholder="Your full name"
                        />
                      )}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className={fieldLabel}>
                      Email Address *
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                        maxLength: {
                          value: 100,
                          message: "Email must be less than 100 characters",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="email"
                          id="email"
                          className={`${inputBase} ${
                            errors.email ? "border-red-400" : "border-rule"
                          }`}
                          placeholder="your.email@example.com"
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={fieldLabel}>
                    Subject *
                  </label>
                  <Controller
                    name="subject"
                    control={control}
                    rules={{
                      required: "Subject is required",
                      minLength: {
                        value: 3,
                        message: "Subject must be at least 3 characters",
                      },
                      maxLength: {
                        value: 100,
                        message: "Subject must be less than 100 characters",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="subject"
                        className={`${inputBase} ${
                          errors.subject ? "border-red-400" : "border-rule"
                        }`}
                        placeholder="What's this about?"
                      />
                    )}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.subject.message}
                    </p>
                  )}
                  <div className="mt-1 text-xs text-muted">
                    {subjectCharCount}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Controller
                      name="budget"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          label="Project Budget"
                          icon={<Calendar size={16} />}
                          options={budgetOptions}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select budget range"
                          maxDisplayLength={20}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="timeline"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          label="Timeline"
                          icon={<Clock size={16} />}
                          options={timelineOptions}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select timeline"
                          maxDisplayLength={20}
                        />
                      )}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={fieldLabel}>
                    Message *
                  </label>
                  <Controller
                    name="message"
                    control={control}
                    rules={{
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                      maxLength: {
                        value: 1000,
                        message: "Message must be less than 1000 characters",
                      },
                    }}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        id="message"
                        rows={6}
                        className={`${inputBase} resize-none ${
                          errors.message ? "border-red-400" : "border-rule"
                        }`}
                        placeholder="Tell me about your project, goals, and how I can help you achieve them..."
                      />
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                  <div className="mt-1 text-xs text-muted">
                    {messageCharCount}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={`${primaryButton} w-full disabled:cursor-not-allowed disabled:bg-rule disabled:text-muted`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                        aria-hidden="true"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} aria-hidden="true" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <ContactPanel socialLinks={socialLinks} />
        )}
      </div>

      {/* Notification Component */}
      {SHOW_CONTACT_FORM && (
        <Notification
          type={notification.type}
          title={notification.title}
          {...(notification.message && { message: notification.message })}
          isVisible={notification.isVisible}
          onClose={closeNotification}
          autoClose={true}
          duration={5000}
        />
      )}
    </section>
  );
};

export default memo(Contact);
