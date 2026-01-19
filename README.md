# 🎥 Webcam Button Component

A beautiful, customizable webcam button component with glassmorphism effects for React and Next.js. This component displays your webcam feed in real-time with a stunning liquid glass aesthetic.

![Webcam Button](https://img.shields.io/badge/React-18+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🪞 **Real-time webcam feed** - See yourself reflected in the button
- 🎨 **Glassmorphism design** - Beautiful liquid glass aesthetic
- 🎯 **Fully customizable** - Pass any className or style props
- ⚡ **Smooth animations** - Hover effects and transitions
- 📱 **Responsive** - Works on all screen sizes
- 🔧 **TypeScript** - Full type safety
- 🎛️ **Configurable** - Control blur, mirror, hover effects, and more

## 📦 Installation

### Option 1: Copy the Component (Recommended)

1. Copy the component file:

   ```bash
   # Copy the component
   cp components/ui/webcam-button.tsx your-project/components/ui/webcam-button.tsx

   # Copy the utils file (if you don't have it)
   cp lib/utils.ts your-project/lib/utils.ts
   ```

2. Install required dependencies:

   ```bash
   pnpm add clsx tailwind-merge
   # or
   npm install clsx tailwind-merge
   # or
   yarn add clsx tailwind-merge
   ```

3. Add the CSS animation to your global CSS:

   ```css
   @keyframes shine {
   	0% {
   		background-position: -200% 0;
   	}
   	100% {
   		background-position: 200% 0;
   	}
   }

   .shine-animation {
   	animation: shine 2s ease-in-out infinite;
   }
   ```

### Option 2: Clone the Repository

```bash
git clone https://github.com/yourusername/webcam-button.git
cd webcam-button
pnpm install
pnpm dev
```

## 🚀 Quick Start

```tsx
import { WebcamButton } from "@/components/ui/webcam-button";

export default function Page() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<WebcamButton text="Click Me" />
		</div>
	);
}
```

## 📖 Usage Examples

### Basic Usage

```tsx
import { WebcamButton } from "@/components/ui/webcam-button";

<WebcamButton text="Hello World" />;
```

### Custom Styling

```tsx
<WebcamButton text="Custom Button" className="w-96 h-32 rounded-full" />
```

### Custom Content

```tsx
<WebcamButton className="w-80 h-24">
	<span className="text-2xl font-bold">Custom Content</span>
</WebcamButton>
```

### Disable Mirror Effect

```tsx
<WebcamButton text="No Mirror" enableMirror={false} />
```

### Custom Blur Intensity

```tsx
<WebcamButton text="Less Blur" blurIntensity="sm" />
```

### Disable Hover Effects

```tsx
<WebcamButton text="Static" enableHoverEffects={false} />
```

### Custom Video Constraints

```tsx
<WebcamButton
	text="HD Camera"
	videoConstraints={{
		width: { ideal: 1920 },
		height: { ideal: 1080 },
	}}
/>
```

### Error Handling

```tsx
<WebcamButton
	text="With Error Handler"
	onWebcamError={(error) => {
		console.error("Webcam error:", error);
		// Show user-friendly error message
	}}
/>
```

### All Props Example

```tsx
<WebcamButton
	text="Fully Customized"
	className="w-96 h-32 rounded-full"
	enableMirror={true}
	enableHoverEffects={true}
	blurIntensity="xl"
	videoConstraints={{ facingMode: "user" }}
	onWebcamError={(error) => console.error(error)}
	onClick={() => console.log("Clicked!")}
	style={{ margin: "20px" }}
/>
```

## 🎨 Props API

| Prop                 | Type                           | Default                  | Description                     |
| -------------------- | ------------------------------ | ------------------------ | ------------------------------- |
| `text`               | `string`                       | `"button"`               | Text to display in the button   |
| `children`           | `ReactNode`                    | -                        | Custom content (overrides text) |
| `className`          | `string`                       | -                        | Additional CSS classes          |
| `enableMirror`       | `boolean`                      | `true`                   | Flip video horizontally         |
| `enableHoverEffects` | `boolean`                      | `true`                   | Enable hover animations         |
| `blurIntensity`      | `"sm" \| "md" \| "lg" \| "xl"` | `"lg"`                   | Blur intensity level            |
| `videoConstraints`   | `MediaTrackConstraints`        | `{ facingMode: "user" }` | Webcam constraints              |
| `onWebcamError`      | `(error: Error) => void`       | -                        | Error callback                  |
| `...buttonProps`     | `ButtonHTMLAttributes`         | -                        | All standard button props       |

## 🎯 Customization

The component accepts all standard button props and className, making it fully customizable:

```tsx
// Custom size and shape
<WebcamButton
  className="w-64 h-64 rounded-lg"
  text="Square"
/>

// Custom colors via Tailwind
<WebcamButton
  className="border-2 border-blue-500"
  text="Blue Border"
/>

// Custom styles
<WebcamButton
  style={{
    boxShadow: "0 0 20px rgba(255, 0, 0, 0.5)",
  }}
  text="Red Glow"
/>
```

## 🛠️ Requirements

- React 18+
- Next.js 13+ (App Router) or any React project
- Tailwind CSS
- Modern browser with webcam support

## 🌐 Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari (may require HTTPS)
- ⚠️ Webcam access requires HTTPS in production

## 📝 Notes

- The component automatically requests webcam permissions
- Video is muted by default
- The component cleans up the webcam stream on unmount
- Works best with good lighting conditions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this component in your projects!

## 🙏 Acknowledgments

- Inspired by modern glassmorphism design trends
- Built with React, Next.js, and Tailwind CSS

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for the React community**
