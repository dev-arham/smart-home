import React from 'react'
import ContactUS from '../../components/blocks/ContactUs.jsx';
import Footer from '@/components/blocks/footer.jsx';
import Header from '@/components/blocks/header.jsx';

export default function page() {
  return (
    <div>
        <Header />
        <ContactUS />
        <Footer/>
    </div>
  )
}
