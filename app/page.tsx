"use client"
import Link from 'next/link';
import { ArrowRight, Users, MessageSquare, Globe, Star } from 'lucide-react';
import { useEffect } from "react";
import { createClient } from "./utils/supabase/clients"
import { useRouter } from "next/navigation";
import LandingPage from './components/HomePage/Page';

export default function Home() {
  return(

  <LandingPage />
  );
}