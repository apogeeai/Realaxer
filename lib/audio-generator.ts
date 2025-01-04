'use client';

class AudioGenerator {
  private context: AudioContext | null = null;
  private nodes: AudioNode[] = [];

  async initialize() {
    if (!this.context) {
      try {
        this.context = new AudioContext();
        // Resume context if it's in suspended state
        if (this.context.state === 'suspended') {
          await this.context.resume();
        }
        return true;
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
        return false;
      }
    }
    return true;
  }

  private createNoiseBuffer(bufferSize: number = 2 * this.context!.sampleRate): AudioBuffer {
    const buffer = this.context!.createBuffer(1, bufferSize, this.context!.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Create pink noise (more natural sounding than white noise)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.11; // Normalize amplitude
      
      b6 = white * 0.115926;
    }
    
    return buffer;
  }

  private createFilter(type: BiquadFilterType, frequency: number, Q: number): BiquadFilterNode {
    if (!this.context) throw new Error('Audio context not initialized');
    const filter = this.context.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = frequency;
    filter.Q.value = Q;
    this.nodes.push(filter);
    return filter;
  }

  private createGain(volume: number): GainNode {
    if (!this.context) throw new Error('Audio context not initialized');
    const gain = this.context.createGain();
    gain.gain.value = volume;
    this.nodes.push(gain);
    return gain;
  }

  private createNoiseSource(buffer: AudioBuffer): AudioBufferSourceNode {
    if (!this.context) throw new Error('Audio context not initialized');
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    this.nodes.push(source);
    return source;
  }

  async generateRain(volume: number = 0.4) {
    if (!await this.initialize()) return;
    if (!this.context) return;
    
    try {
      this.stop();

      const noiseBuffer = this.createNoiseBuffer();
      const masterGain = this.createGain(0.7);

      // Create and connect each layer
      const createLayer = (freq: number, q: number, vol: number) => {
        const filter = this.createFilter('bandpass', freq, q);
        const gain = this.createGain(volume * vol);
        const source = this.createNoiseSource(noiseBuffer);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        return source;
      };

      // Light rain drops (high frequency)
      const lightRain = createLayer(2500, 0.2, 0.15);

      // Medium rain (mid frequency)
      const mediumRain = createLayer(800, 0.3, 0.25);

      // Heavy rain (low frequency)
      const heavyRain = createLayer(300, 0.5, 0.35);

      // Rumble
      const rumbleFilter = this.createFilter('lowpass', 80, 0.5);
      const rumbleGain = this.createGain(volume * 0.1);
      const rumbleSource = this.createNoiseSource(noiseBuffer);
      rumbleSource.connect(rumbleFilter);
      rumbleFilter.connect(rumbleGain);
      rumbleGain.connect(masterGain);

      masterGain.connect(this.context.destination);

      // Start all sources
      [lightRain, mediumRain, heavyRain, rumbleSource].forEach(source => source.start());

    } catch (error) {
      console.error('Error generating rain sound:', error);
      this.stop();
    }
  }

  async generateSpaceAmbient(volume: number = 0.3) {
    if (!await this.initialize()) return;
    if (!this.context) return;
    
    try {
      this.stop();

      const noiseBuffer = this.createNoiseBuffer();
      const masterGain = this.createGain(0.6);

      // Deep space background
      const deepFilter = this.createFilter('lowpass', 50, 1.0);
      const deepGain = this.createGain(volume * 0.4);
      const deepSource = this.createNoiseSource(noiseBuffer);
      deepSource.connect(deepFilter);
      deepFilter.connect(deepGain);
      deepGain.connect(masterGain);

      // Cosmic wind
      const windFilter = this.createFilter('bandpass', 150, 1.5);
      const windGain = this.createGain(volume * 0.25);
      const windSource = this.createNoiseSource(noiseBuffer);
      windSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(masterGain);

      // Slow modulation for the wind
      const modulator = this.context.createOscillator();
      const modulatorGain = this.createGain(20);
      modulator.frequency.value = 0.03;
      modulator.connect(modulatorGain);
      modulatorGain.connect(windFilter.frequency);
      this.nodes.push(modulator);

      // Ethereal high frequencies
      const highFilter = this.createFilter('highpass', 1500, 1.5);
      const highGain = this.createGain(volume * 0.08);
      const highSource = this.createNoiseSource(noiseBuffer);
      highSource.connect(highFilter);
      highFilter.connect(highGain);
      highGain.connect(masterGain);

      masterGain.connect(this.context.destination);

      // Start all sources
      modulator.start();
      [deepSource, windSource, highSource].forEach(source => source.start());

    } catch (error) {
      console.error('Error generating space ambient:', error);
      this.stop();
    }
  }

  stop() {
    try {
      // Stop and disconnect all nodes
      this.nodes.forEach(node => {
        if (node instanceof AudioBufferSourceNode) {
          try {
            node.stop();
          } catch (e) {
            // Ignore errors from already stopped nodes
          }
        }
        try {
          node.disconnect();
        } catch (e) {
          // Ignore errors from already disconnected nodes
        }
      });
    } catch (error) {
      console.error('Error stopping sound:', error);
    } finally {
      this.nodes = [];
    }
  }
}

// Singleton instance
let audioGenerator: AudioGenerator | null = null;

export function getAudioGenerator(): AudioGenerator {
  if (!audioGenerator) {
    audioGenerator = new AudioGenerator();
  }
  return audioGenerator;
} 