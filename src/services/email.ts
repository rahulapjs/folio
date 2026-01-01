import emailjs from '@emailjs/browser';

export const sendEmail = (templateParams: Record<string, unknown>) => {
  return emailjs.send(
    import.meta.env?.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    templateParams,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};
