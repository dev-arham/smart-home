import About from "@/components/blocks/about"
import Footer from "@/components/blocks/footer"
import Header from "@/components/blocks/header"

export const metadata = {
  title: "About Us | Aqua Electrical - Smart Home Solutions",
  description: "Learn about Aqua Electrical's journey to becoming Pakistan's leading smart home provider. Our story, values, and dedicated team.",
}

export default function AboutPage() {
  return( 
  <>
  <Header/>
  <About />
  <Footer/>
  </>
  )
}
