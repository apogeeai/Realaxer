"use client";

import { MixerBoard } from "@/components/mixer-board";
import { AmbientMixer } from "@/components/ambient-mixer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="relative min-h-screen min-w-[430px] max-w-[1260px] mx-auto">
      <div 
        className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8')] bg-cover bg-center"
        style={{ 
          filter: 'brightness(0.7)',
          zIndex: -1,
        }}
      />
      <div className="relative min-h-screen backdrop-blur-sm bg-black/30">
        <main className="container mx-auto p-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Forest Sound Studio
          </h1>
          
          <Tabs defaultValue="mixer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/40">
              <TabsTrigger 
                value="mixer"
                className="data-[state=active]:bg-white/10"
              >
                Audio Mixer
              </TabsTrigger>
              <TabsTrigger 
                value="ambient"
                className="data-[state=active]:bg-white/10"
              >
                Ambient Sounds
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mixer">
              <div className="relative bg-black/40 p-4 rounded-lg backdrop-blur-md">
                <MixerBoard />
              </div>
            </TabsContent>
            
            <TabsContent value="ambient">
              <div className="relative bg-black/40 p-4 rounded-lg backdrop-blur-md">
                <AmbientMixer />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}