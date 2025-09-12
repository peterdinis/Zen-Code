import { FC } from "react";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { CodePreview } from "./CodeFormat";
import { Footer } from "../shared/Footer";

const HeroWrapper: FC = () => {
    return (
       <div className="min-h-screen bg-background">
          <Hero />
          <Features />
          <CodePreview />
          <Footer />
       </div>
    )
}

export default HeroWrapper