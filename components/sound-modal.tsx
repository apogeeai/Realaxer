"use client";

import { X } from "lucide-react";
import { MixerBoard } from "@/components/mixer-board";
import { AmbientMixer } from "@/components/ambient-mixer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface SoundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SoundModal({ isOpen, onClose }: SoundModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-[1000px] max-h-[90vh] overflow-y-auto mx-4 bg-black/40 rounded-lg backdrop-blur-md border border-white/10">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 text-white hover:bg-white/20 z-10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="p-6">
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
        </div>
      </div>
    </div>
  );
} 