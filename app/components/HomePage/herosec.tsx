import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center bg-gradient-to-b from-background to-secondary/10">
      <main className="container px-4 md:px-8 py-16 relative">
        {/* Gradient background blur effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl opacity-30" />
        
        <div className="flex flex-col items-center text-center gap-12 max-w-5xl mx-auto relative">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[200%_auto] animate-gradient bg-clip-text text-transparent">
              Revolutionizing Events, 
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[200%_auto] animate-gradient bg-clip-text text-transparent">
              Conferences, and
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[200%_auto] animate-gradient bg-clip-text text-transparent">
              Destination Weddings
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl bg-gradient-to-r from-foreground/80 to-foreground/60 bg-clip-text text-transparent max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The one-stop intelligent platform for seamless event management, 
            personalized experiences, and end-to-end collaboration.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="text-xl px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              asChild
            >
              <Link href="/get-started">
                Get started
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-xl px-8 py-6 rounded-full border-2 transition-all duration-300 hover:scale-105 bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10 border-blue-600/20 hover:border-purple-600/30 text-foreground"
              asChild
            >
              <Link href="/learn-more">
                Learn more
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// Add this to your global CSS file
const styles = `

`;