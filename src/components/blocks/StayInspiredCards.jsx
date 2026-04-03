import Image from 'next/image';
import { Button } from '@/components/ui/button';

const cards = [
  {
    id: 1,
    title: 'Traditional Switches',
    description:
      'Elegant smart switch that brings effortless control and modern living to your home',
    buttonText: 'Explore',
    image: '/images/traditional-switches-banner.png',
  },
  {
    id: 2,
    title: 'Smart Switches',
    description:
      'Experience the future of home automation with intelligent lighting control',
    buttonText: 'Learn More',
    image: '/images/smart-swithes-banner.png',
  },
];

export default function StayInspiredCards() {
  return (
    <section className="relative container mx-auto z-10 grid grid-cols-2 gap-8 py-10">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="w-full rounded-3xl sm:h-[80svh] md:h-[85svh] border shadow"
          style={{ zIndex: index + 1 }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] shadow-2xl sm:rounded-3xl">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="md:object-cover object-cover object-center transition-transform duration-300 hover:scale-105"
              sizes="100vw"
              priority={index === 0}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-12 lg:p-16">
              <p className="mb-3 text-xs font-medium tracking-[0.3em] text-white/60 uppercase sm:mb-4 sm:text-sm">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(cards.length).padStart(2, '0')}
              </p>
              <h2 className="mb-3 max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                {card.title}
              </h2>
              <p className="mb-6 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:mb-8 md:text-lg">
                {card.description}
              </p>
              <Button
                size="lg"
                className="w-full rounded-full bg-white px-8 py-3 text-base font-normal text-black shadow-lg transition-all duration-300 hover:bg-white/90 sm:w-auto"
              >
                {card.buttonText}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
