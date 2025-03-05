import { GridMotion } from "@/components/ui/grid-motion"
import { Badge } from "@/components/ui/badge"

export function GridMotionDemo() {
  const items = [
    'Yamunotri',
    <div key='temple-1' className="flex flex-col items-center">
      <Badge variant="outline" className="mb-2">Sacred Temple</Badge>
      Divine Energy
    </div>,
    'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    'Gangotri',
    <div key='temple-2' className="flex flex-col items-center">
      <Badge variant="outline" className="mb-2">Holy Site</Badge>
      Source of Ganga
    </div>,
    'Kedarnath',
    <div key='temple-3' className="flex flex-col items-center">
      <Badge variant="outline" className="mb-2">Ancient Temple</Badge>
      Lord Shiva's Abode
    </div>,
    'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    'Badrinath',
    <div key='temple-4' className="flex flex-col items-center">
      <Badge variant="outline" className="mb-2">Sacred Shrine</Badge>
      Lord Vishnu's Seat
    </div>,
    'Spiritual Journey',
    <div key='info-1' className="flex flex-col items-center">
      <Badge variant="outline" className="mb-2">Experience</Badge>
      Divine Bliss
    </div>,
    'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    'Sacred Path',
    <div key='info-2' className="flex flex-col items-center">
      <Badge variant="outline" className="mb-2">Journey</Badge>
      Inner Peace
    </div>,
    'Holy Rivers',
    <div key='info-3' className="flex flex-col items-center">
      <Badge variant="outline" className="mb-2">Nature</Badge>
      Pure Waters
    </div>,
    'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    'Mountain Peaks',
    <div key='info-4' className="flex flex-col items-center">
      <Badge variant="outline" className="mb-2">Himalayan</Badge>
      Divine Heights
    </div>,
    'Ancient Wisdom',
    <div key='info-5' className="flex flex-col items-center">
      <Badge variant="outline" className="mb-2">Heritage</Badge>
      Timeless Traditions
    </div>,
    'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    'Sacred Rituals',
    <div key='info-6' className="flex flex-col items-center">
      <Badge variant="outline" className="mb-2">Culture</Badge>
      Spiritual Practices
    </div>,
  ];

  return (
    <div className="space-y-8">
      {/* Char Dham Yatra Grid */}
      <div className="h-screen w-full bg-gradient-to-br from-background to-muted">
        <GridMotion 
          items={items}
          gradientColor="hsl(var(--primary))"
          className="relative z-10 backdrop-blur-sm"
        />
      </div>
    </div>
  )
} 