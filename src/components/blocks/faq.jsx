import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Faq = () => {
  const faqData = [
    {
      id: "item-1",
      question: "What smart home devices do you offer?",
      answer: "We offer a comprehensive range of smart home devices including smart lighting systems, thermostats, security cameras, door locks, voice assistants, smart plugs, and complete home automation hubs. All our products are compatible with major platforms like Google Home, Amazon Alexa, and Apple HomeKit."
    },
    {
      id: "item-2",
      question: "How do I install and set up my smart home devices?",
      answer: "Most of our devices come with easy-to-follow installation guides and dedicated mobile apps. Simply download the app, follow the step-by-step instructions, and connect your device to your Wi-Fi network. For complex installations, we also offer professional installation services. Our customer support team is available 24/7 to assist you."
    },
    {
      id: "item-3",
      question: "Are your smart home devices compatible with each other?",
      answer: "Yes! We ensure all our devices work seamlessly together through popular smart home platforms. You can control multiple devices from a single app and create custom automation routines. We recommend checking the compatibility section on each product page for specific details."
    },
    {
      id: "item-4",
      question: "What is your warranty and return policy?",
      answer: "All our products come with a standard 2-year manufacturer warranty covering defects and malfunctions. We offer a 30-day money-back guarantee if you're not satisfied with your purchase. For returns, the product must be in original condition with all accessories and packaging."
    },
    {
      id: "item-5",
      question: "How secure are your smart home devices?",
      answer: "Security is our top priority. All our devices feature end-to-end encryption, regular security updates, and multi-factor authentication options. We comply with industry standards and regulations to ensure your data and privacy are protected. Each device undergoes rigorous security testing before release."
    },
    {
      id: "item-6",
      question: "Do you offer free shipping?",
      answer: "Yes, we offer free standard shipping on all orders over PKR 5000 within the country. For orders below this amount, a flat shipping fee applies. We also provide expedited shipping options at an additional cost. International shipping rates vary based on destination."
    }
  ]

  return (
    <section className="w-full relative border-y border-border mb-20 p-5 pb-10">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[14px_24px]">
        <div className="-z-10 m-auto h-77.5 w-77.5 rounded-full bg-blue-400 dark:bg-blue-600 opacity-20 blur-[100px]"></div>
      </div>
      <div className="container mx-auto py-12 md:py-20 lg:py-24 mb-5 px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
            Find answers to common questions about our smart home products and services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
            {faqData.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border rounded-lg px-4 md:px-6 bg-card hover:shadow-md dark:hover:shadow-white/5 transition-shadow"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-medium py-4 md:py-5 hover:no-underline text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground pb-4 md:pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default Faq
