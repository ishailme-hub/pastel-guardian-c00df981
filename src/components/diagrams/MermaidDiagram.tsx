import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "#0d9488",
    primaryTextColor: "#1a1a2e",
    primaryBorderColor: "#0d9488",
    lineColor: "#94a3b8",
    secondaryColor: "#e9d5ff",
    tertiaryColor: "#fef3c7",
    background: "#ffffff",
    mainBkg: "#f8fafc",
    nodeBorder: "#cbd5e1",
    clusterBkg: "#f1f5f9",
    clusterBorder: "#cbd5e1",
    titleColor: "#1a1a2e",
    edgeLabelBackground: "#ffffff",
  },
  flowchart: {
    curve: "basis",
    padding: 20,
  },
});

const MermaidDiagram = ({ chart, className = "" }: MermaidDiagramProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const idRef = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderDiagram = async () => {
      if (containerRef.current) {
        try {
          const { svg } = await mermaid.render(idRef.current, chart);
          setSvg(svg);
        } catch (error) {
          console.error("Mermaid rendering error:", error);
        }
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div
      ref={containerRef}
      className={`mermaid-container overflow-x-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
