import React, { useState, useEffect, useMemo, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  Handle,
  Position
} from "reactflow";
import "reactflow/dist/style.css";
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  Search,
  Filter,
  Users,
  Compass,
  ChevronsRight,
  Sparkles,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { taromboData } from "../data/taromboData";
import { GorgaBorder } from "./GorgaOrnament";

// Custom node dimensions (enlarged for premium readability)
const nodeWidth = 420;
const nodeHeight = 180;
const levelGapVertical = 300;     // Vertical generation spacing (Top-to-Bottom)
const levelGapHorizontal = 580;   // Horizontal generation spacing (Left-to-Right) - needs to be > nodeWidth (420) to prevent overlap!
const siblingGap = 85;

// HELPER COMPONENT: Renders a vector-accurate replica of the Ulos Sadum pattern from the user's reference image.
function UlosSadumBackground() {
  const leftRightPattern = useMemo(() => {
    let path = "";
    for (let y = 0; y < 180; y += 8) {
      path += `M10,${y} L18,${y + 8} M10,${y + 8} L18,${y} `;
    }
    return path;
  }, []);

  const rightPattern = useMemo(() => {
    let path = "";
    for (let y = 0; y < 180; y += 8) {
      path += `M400,${y} L408,${y + 8} M400,${y + 8} L408,${y} `;
    }
    return path;
  }, []);

  // Top spikes (Band 1)
  const spikesPath = useMemo(() => {
    let redPath = "M25,32 ";
    let whitePath = "M25,32 ";
    let x = 25;
    let step = 10;
    while (x < 395) {
      redPath += `L${x + step / 2},3 L${x + step},32 `;
      whitePath += `L${x + step / 2},14 L${x + step},32 `;
      x += step;
    }
    return { redPath, whitePath };
  }, []);

  // Middle squiggly wave vectors (Band 3)
  const wavePath = useMemo(() => {
    let path = "M25,122 ";
    let x = 25;
    while (x < 395) {
      path += `Q${x + 4},110 ${x + 8},122 T${x + 16},122 `;
      x += 16;
    }
    return path;
  }, []);

  const wavePath2 = useMemo(() => {
    let path = "M25,132 ";
    let x = 25;
    while (x < 395) {
      path += `Q${x + 4},138 ${x + 8},132 T${x + 16},132 `;
      x += 16;
    }
    return path;
  }, []);

  // Bottom triangles (Band 4)
  const bottomTriangles = useMemo(() => {
    let path = "M25,180 ";
    let x = 25;
    while (x < 395) {
      path += `L${x + 4},172 L${x + 8},180 `;
      x += 8;
    }
    return path;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden z-0">
      <svg width="100%" height="100%" viewBox="0 0 420 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="sadum-diamonds" width="18" height="18" patternUnits="userSpaceOnUse">
            <rect width="18" height="18" fill="#fcfcfc" />
            <polygon points="9,1 17,9 9,17 1,9" fill="none" stroke="#111111" strokeWidth="1.2" />
            <polygon points="9,4 14,9 9,14 4,9" fill="#8B0000" />
          </pattern>
        </defs>

        {/* 1. Left Border Columns */}
        <rect x="0" y="0" width="10" height="180" fill="#581623" />
        <rect x="10" y="0" width="8" height="180" fill="#ffffff" />
        <path d={leftRightPattern} stroke="#111111" strokeWidth="1.2" fill="none" />
        <rect x="18" y="0" width="7" height="180" fill="#581623" />
        <line x1="25" y1="0" x2="25" y2="180" stroke="#D4AF37" strokeWidth="1.2" />

        {/* 2. Central Area Bands */}
        {/* Band 1: Spikes on Black */}
        <rect x="25" y="0" width="370" height="32" fill="#111111" />
        <path d={spikesPath.redPath} fill="none" stroke="#8B0000" strokeWidth="2" />
        <path d={spikesPath.whitePath} fill="none" stroke="#ffffff" strokeWidth="1" />

        {/* Divider 1 */}
        <line x1="25" y1="32" x2="395" y2="32" stroke="#ffffff" strokeWidth="1" />
        <line x1="25" y1="33" x2="395" y2="33" stroke="#D4AF37" strokeWidth="0.8" />

        {/* Band 2: Diamond Pattern (Sadum Grid) */}
        <rect x="25" y="34" width="370" height="61" fill="url(#sadum-diamonds)" />

        {/* Divider 2 */}
        <line x1="25" y1="95" x2="395" y2="95" stroke="#111111" strokeWidth="1.5" />

        {/* Band 3: Red/Burgundy with Squiggly Waves */}
        <rect x="25" y="96" width="370" height="56" fill="#2d0a11" />
        <path d={wavePath} fill="none" stroke="#ffffff" strokeWidth="0.8" />
        <path d={wavePath2} fill="none" stroke="#8B0000" strokeWidth="0.8" />
        
        {/* Divider 3 */}
        <line x1="25" y1="152" x2="395" y2="152" stroke="#111111" strokeWidth="1" />

        {/* Band 4: Bottom Geometric */}
        <rect x="25" y="153" width="370" height="27" fill="#e9e9e9" />
        <line x1="25" y1="160" x2="395" y2="160" stroke="#111111" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="25" y1="167" x2="395" y2="167" stroke="#8B0000" strokeWidth="0.8" strokeDasharray="2 4" />
        <path d={bottomTriangles} stroke="#111111" strokeWidth="0.8" fill="none" />

        {/* 3. Right Border Columns */}
        <line x1="395" y1="0" x2="395" y2="180" stroke="#D4AF37" strokeWidth="1" />
        <rect x="396" y="0" width="4" height="180" fill="#581623" />
        <rect x="400" y="0" width="8" height="180" fill="#ffffff" />
        <path d={rightPattern} stroke="#111111" strokeWidth="1.2" fill="none" />
        <rect x="408" y="0" width="12" height="180" fill="#581623" />
      </svg>
      {/* Light Overlay to integrate card text nicely and guarantee high contrast */}
      <div className="absolute inset-y-0 left-[25px] right-[25px] bg-[#111111]/72 backdrop-blur-[1px] border-l border-r border-[#8B0000]/15" />
    </div>
  );
}

// CUSTOM NODE COMPONENT (Rendered inside React Flow Canvas)
function MemberNode({ data }) {
  const isHighlighted = data.isHighlighted;
  const isSelected = data.isSelected;

  // Determine card theme color based on lineage branch
  let borderTheme = "border-[#8B0000]/30 shadow-[0_0_15px_rgba(139,0,0,0.05)]";
  let badgeColor = "bg-[#8B0000]/20 text-red-400 border-[#8B0000]/30";
  
  if (data.id === "gurutateabulan" || data.id === "sirajalottung" || data.id === "sirajaborbor") {
    borderTheme = "border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.05)]";
    badgeColor = "bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30";
  } else if (data.id === "rajaisombaon" || data.id === "tuansorimangaraja" || data.id === "oprajanabolon" || data.id === "tuansorbadibanua") {
    borderTheme = "border-red-600/40 shadow-[0_0_15px_rgba(220,38,38,0.05)]";
    badgeColor = "bg-red-950/40 text-red-400 border-red-800/40";
  }

  if (isHighlighted) {
    borderTheme = "border-yellow-400/90 shadow-[0_0_25px_rgba(234,179,8,0.45)] scale-105 ring-1 ring-yellow-400/30";
  } else if (isSelected) {
    borderTheme = "border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.45)] scale-105";
  }

  // Handle placement based on direction
  const isLR = data.direction === "LR";
  const targetPos = isLR ? Position.Left : Position.Top;
  const sourcePos = isLR ? Position.Right : Position.Bottom;

  return (
    <div
      onClick={(e) => {
        // Prevent click when tapping the expand/collapse button
        if (e.target.closest(".toggle-btn")) return;
        data.onSelectMember(data);
      }}
      className={`relative overflow-hidden rounded-xl text-left glow-card-hover cursor-pointer transition-all duration-300 select-none ${borderTheme}`}
      style={{ width: `${nodeWidth}px`, height: `${nodeHeight}px` }}
    >
      {/* 1. Authentic Ulos Sadum Pattern Background */}
      <UlosSadumBackground />

      {/* 2. Handles for connections */}
      {data.generation > 1 && (
        <Handle
          type="target"
          position={targetPos}
          style={{ background: "#D4AF37", width: 8, height: 8, zIndex: 10 }}
        />
      )}
      
      {data.hasChildren && (
        <Handle
          type="source"
          position={sourcePos}
          style={{ background: "#8B0000", width: 8, height: 8, zIndex: 10 }}
        />
      )}

      {/* Ribbon indicator if highlighted (positioned safely inside the top-right corner of the card) */}
      {isHighlighted && (
        <div className="absolute top-2 right-11 bg-yellow-500 text-black text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded shadow z-10">
          Dicari
        </div>
      )}

      {/* Card Content */}
      <div className="h-full flex flex-col justify-between pl-12 pr-12 py-7 relative z-10">
        <div>
          <div className="flex items-center justify-between">
            <span className={`text-xs px-3 py-1 rounded-md font-semibold tracking-wider border uppercase font-mono ${badgeColor}`}>
              G{data.generation}
            </span>
            
            {/* Origin Location (soft display) */}
            {data.origin && (
              <span className="text-xs text-zinc-200 font-normal truncate max-w-[180px]">
                {data.origin.split(",")[0]}
              </span>
            )}
          </div>

          <h4 className="text-xl font-cinzel font-bold text-white tracking-wide mt-3 truncate">
            {data.name}
          </h4>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-800/60 pt-3 mt-3">
          {/* Subtitle / Clan title */}
          <span className="text-sm text-zinc-200 font-normal truncate max-w-[240px]">
            {data.title || "Keturunan"}
          </span>

          {/* Expand/Collapse Button */}
          {data.hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                data.onToggleExpand(data.id);
              }}
              className="toggle-btn w-8 h-8 rounded-full bg-zinc-950/80 border border-zinc-800 flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37] transition cursor-pointer"
            >
              {data.isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// CUSTOM TITLE NODE COMPONENT
function TreeTitleNode({ data }) {
  const isHorizontal = data?.direction === "LR";

  if (isHorizontal) {
    return (
      <div className="flex flex-col items-center justify-center text-center select-none p-4 w-[400px] h-[260px] pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-cinzel font-black tracking-widest text-white uppercase leading-[1.2]">
          <span className="block whitespace-nowrap">TAROMBO</span>
          <span className="block whitespace-nowrap mt-1">SILSILAH</span>
          <span className="block whitespace-nowrap mt-1">BATAK</span>
        </h2>
        <div className="h-[1.5px] w-[180px] bg-gradient-to-r from-transparent via-white to-transparent mt-4" />
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono mt-2 leading-relaxed">
          Silsilah Utama Suku Batak Toba
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center select-none p-4 w-[1100px] pointer-events-none">
      <h2 className="text-6xl md:text-8xl font-cinzel font-black tracking-widest text-white uppercase leading-[1.1]">
        <span className="block whitespace-nowrap">TAROMBO SILSILAH</span>
        <span className="block whitespace-nowrap mt-1">BATAK</span>
      </h2>
      <div className="h-[1.5px] w-[400px] bg-gradient-to-r from-transparent via-white to-transparent mt-5" />
      <span className="text-sm uppercase tracking-widest text-zinc-400 font-mono mt-2">
        Silsilah Utama Suku Batak Toba
      </span>
    </div>
  );
}

// Map custom node types
const nodeTypes = {
  memberNode: MemberNode,
  treeTitleNode: TreeTitleNode
};

function FamilyTree({ onSelectMember }) {
  const reactFlowInstance = useReactFlow();

  // STYLING & VIEWPORT STATES
  const [layoutDirection, setLayoutDirection] = useState("TB"); // TB (Top-Bottom) or LR (Left-Right)
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [selectedLineage, setSelectedLineage] = useState("all"); // 'all', 'gurutatea', 'rajaisombaon'

  // Calculate maximum generation present in data dynamically
  const maxGen = useMemo(() => {
    const findMaxGen = (node) => {
      let max = node.generation || 1;
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          max = Math.max(max, findMaxGen(child));
        });
      }
      return max;
    };
    return findMaxGen(taromboData);
  }, []);

  const generationOptions = useMemo(() => {
    const options = ["all"];
    for (let i = 1; i <= maxGen; i++) {
      options.push(i);
    }
    return options;
  }, [maxGen]);

  const [selectedGeneration, setSelectedGeneration] = useState("all"); // 'all', 1..maxGen
  
  // Set containing IDs of expanded nodes (default first few generations expanded)
  const [expandedNodes, setExpandedNodes] = useState(
    new Set(["sirajabatak", "gurutateabulan", "rajaisombaon", "tuansariburaja", "tuansorimangaraja", "rajanamangarerak", "sirajaborbor", "limbongmulana", "langgatlimbong"])
  );
  
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [initialFitDone, setInitialFitDone] = useState(false);

  // Toggle child expansion
  const handleToggleExpand = useCallback((nodeId) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  // Recalculate node subtree widths dynamically to avoid overlaps
  const computeSubtreeWidths = useCallback((node, isHorizontal) => {
    const gap = isHorizontal ? 50 : siblingGap;
    if (!node.children || node.children.length === 0 || !expandedNodes.has(node.id)) {
      // Leaf or collapsed node size
      node.subtreeWidth = (isHorizontal ? nodeHeight : nodeWidth) + gap;
      return node.subtreeWidth;
    }

    let totalWidth = 0;
    node.children.forEach((child) => {
      totalWidth += computeSubtreeWidths(child, isHorizontal);
    });

    node.subtreeWidth = Math.max((isHorizontal ? nodeHeight : nodeWidth) + gap, totalWidth);
    return node.subtreeWidth;
  }, [expandedNodes]);

  // Recursively place nodes and edges based on calculated subtree widths
  const assignPositions = useCallback((
    node,
    x,
    y,
    nodesList,
    edgesList,
    parentId = null,
    isHorizontal = false,
    query = "",
    selectedLineageFilter = "all",
    selectedGenFilter = "all",
    currentLineage = ""
  ) => {
    // 1. Evaluate Search Query Match (checks name and list of margas)
    const isSearchMatch = query.trim() !== "" && (
      node.name.toLowerCase().includes(query.toLowerCase()) ||
      (node.margas && node.margas.some(m => m.toLowerCase().includes(query.toLowerCase())))
    );

    // 2. Evaluate filter match
    const generationMatch = selectedGenFilter === "all" || node.generation === parseInt(selectedGenFilter);
    
    // Determine lineage dynamically
    let nextLineage = currentLineage;
    if (node.id === "gurutateabulan") {
      nextLineage = "gurutatea";
    } else if (node.id === "rajaisombaon") {
      nextLineage = "rajaisombaon";
    }

    // Lineage filter matching
    let lineageMatch = true;
    if (selectedLineageFilter === "gurutatea") {
      lineageMatch = node.id === "sirajabatak" || nextLineage === "gurutatea";
    } else if (selectedLineageFilter === "rajaisombaon") {
      lineageMatch = node.id === "sirajabatak" || nextLineage === "rajaisombaon";
    }

    const isFilteredOut = !generationMatch || !lineageMatch;

    // Add nodes to list
    nodesList.push({
      id: node.id,
      type: "memberNode",
      position: { x, y },
      data: {
        ...node,
        direction: isHorizontal ? "LR" : "TB",
        hasChildren: node.children && node.children.length > 0,
        isExpanded: expandedNodes.has(node.id),
        isHighlighted: isSearchMatch,
        isSelected: selectedNodeId === node.id,
        onToggleExpand: handleToggleExpand,
        onSelectMember: (m) => {
          setSelectedNodeId(m.id);
          onSelectMember(m);
          // Auto-center camera on the selected card, offset left to clear the desktop drawer
          const isWide = window.innerWidth > 768;
          const xOffset = isWide ? 180 : 0;
          const zoomLevel = isWide ? 0.85 : 0.70;
          if (reactFlowInstance && reactFlowInstance.setCenter) {
            reactFlowInstance.setCenter(
              x + nodeWidth / 2 + xOffset,
              y + nodeHeight / 2,
              { zoom: zoomLevel, duration: 600 }
            );
          }
        }
      },
      style: {
        opacity: isFilteredOut ? 0.25 : 1,
        pointerEvents: "auto",
        transition: "opacity 0.3s ease"
      }
    });

    // Add edges
    if (parentId) {
      edgesList.push({
        id: `edge-${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
        animated: isSearchMatch || selectedNodeId === node.id || selectedNodeId === parentId,
        className: (isSearchMatch || selectedNodeId === node.id) ? "active" : "normal",
        style: {
          stroke: "#ffffff",
          strokeWidth: (isSearchMatch || selectedNodeId === node.id) ? 5.5 : 3.5,
          opacity: isFilteredOut ? 0.25 : 1
        }
      });
    }

    // Traverse children if node is expanded
    if (node.children && node.children.length > 0 && expandedNodes.has(node.id)) {
      if (isHorizontal) {
        // Left-to-Right layout: spread child nodes vertically (along Y)
        let currentY = y - node.subtreeWidth / 2;
        node.children.forEach((child) => {
          const childSubtreeWidth = child.subtreeWidth;
          const childX = x + levelGapHorizontal;
          const childY = currentY + childSubtreeWidth / 2;
          assignPositions(child, childX, childY, nodesList, edgesList, node.id, isHorizontal, query, selectedLineageFilter, selectedGenFilter, nextLineage);
          currentY += childSubtreeWidth;
        });
      } else {
        // Top-to-Bottom layout: spread child nodes horizontally (along X)
        let currentX = x - node.subtreeWidth / 2;
        node.children.forEach((child) => {
          const childSubtreeWidth = child.subtreeWidth;
          const childX = currentX + childSubtreeWidth / 2;
          const childY = y + levelGapVertical;
          assignPositions(child, childX, childY, nodesList, edgesList, node.id, isHorizontal, query, selectedLineageFilter, selectedGenFilter, nextLineage);
          currentX += childSubtreeWidth;
        });
      }
    }
  }, [expandedNodes, selectedNodeId, handleToggleExpand, onSelectMember, reactFlowInstance]);

  // RE-CALCULATE ENTIRE GRAPH ON STATE CHANGE
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const nodesList = [];
    const edgesList = [];
    const isHorizontal = layoutDirection === "LR";

    // 1. Deep copy tree and compute subtree spacing widths
    const treeCopy = JSON.parse(JSON.stringify(taromboData));
    computeSubtreeWidths(treeCopy, isHorizontal);

    // 2. Allocate coordinates recursively
    assignPositions(
      treeCopy,
      0, // Start coordinate X
      0, // Start coordinate Y
      nodesList,
      edgesList,
      null, // Parent ID
      isHorizontal,
      activeSearchQuery,
      selectedLineage,
      selectedGeneration,
      "" // Initial lineage
    );

    // 3. Add floating title node centered above "sirajabatak"
    nodesList.push({
      id: "tree-title",
      type: "treeTitleNode",
      position: isHorizontal ? { x: -450, y: -60 } : { x: -380, y: -450 },
      data: { direction: layoutDirection },
      style: {
        zIndex: 5,
        pointerEvents: "none"
      }
    });

    setNodes(nodesList);
    setEdges(edgesList);
  }, [
    layoutDirection,
    expandedNodes,
    activeSearchQuery,
    selectedLineage,
    selectedGeneration,
    selectedNodeId,
    computeSubtreeWidths,
    assignPositions,
    setNodes,
    setEdges
  ]);

  // Reset initial fit on major filter or layout changes
  useEffect(() => {
    setInitialFitDone(false);
  }, [layoutDirection, selectedLineage, selectedGeneration]);

  // Fit view on initial load and layout/filter changes
  useEffect(() => {
    if (nodes.length > 0 && reactFlowInstance && !initialFitDone) {
      const timer = setTimeout(() => {
        const isHorizontal = layoutDirection === "LR";
        reactFlowInstance.fitView({ 
          padding: isHorizontal ? 0.20 : 0.12, 
          duration: 800 
        });
        setInitialFitDone(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [nodes, reactFlowInstance, initialFitDone, layoutDirection]);

  // SEARCH AND CINEMATIC CAMERA PANNING TO RESULTS
  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const query = searchQuery.trim();
    setActiveSearchQuery(query);
    if (!query) return;

    // Find the first matching node
    const matchedNode = nodes.find(
      (n) =>
        n.data &&
        n.data.name &&
        (n.data.name.toLowerCase().includes(query.toLowerCase()) ||
          (n.data.margas && n.data.margas.some((m) => m.toLowerCase().includes(query.toLowerCase()))))
    );

    if (matchedNode) {
      setSelectedNodeId(matchedNode.id);
      
      // Expand all parent nodes leading up to this matched node
      const parentChain = getParentChain(taromboData, matchedNode.id);
      if (parentChain && parentChain.length > 0) {
        setExpandedNodes((prev) => {
          const next = new Set(prev);
          parentChain.forEach((id) => next.add(id));
          return next;
        });
      }

      // Smooth pan camera focus
      const isWide = window.innerWidth > 768;
      const zoomLevel = isWide ? 0.85 : 0.70;
      if (reactFlowInstance && reactFlowInstance.setCenter) {
        reactFlowInstance.setCenter(
          matchedNode.position.x + nodeWidth / 2,
          matchedNode.position.y + nodeHeight / 2,
          { zoom: zoomLevel, duration: 800 }
        );
      }
    }
  };

  // Helper: Find all parent node IDs leading to a target node
  const getParentChain = (node, targetId, chain = []) => {
    if (node.id === targetId) return chain;
    if (node.children) {
      for (let child of node.children) {
        const result = getParentChain(child, targetId, [...chain, node.id]);
        if (result) return result;
      }
    }
    return null;
  };

  // Fit Entire Viewport
  const handleFitView = () => {
    reactFlowInstance.fitView({ padding: 0.15, duration: 600 });
  };

  return (
    <section id="pohon" className="h-screen w-full relative bg-[#111111] border-t border-[#8B0000]/20 flex flex-col">
      
      {/* Decorative Grid Lines Overlay */}
      <div className="absolute inset-0 ulos-bg opacity-30 pointer-events-none z-0" />

      {/* FLOATING CONTROL BAR (Top Panel) */}
      <div className="absolute top-6 left-6 right-6 z-10 flex flex-col md:flex-row gap-4 justify-between pointer-events-none">
        
        {/* Left Side: Title and Search box */}
        <div className="flex flex-col md:flex-row gap-3 pointer-events-auto items-stretch">
          <div
            className="flex items-center bg-black/70 border border-[#8B0000]/40 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-[0_0_15px_rgba(139,0,0,0.1)] focus-within:border-[#D4AF37] focus-within:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300"
          >
            <Search className="w-4 h-4 text-zinc-400 mr-2" />
            <input
              type="text"
              placeholder="Cari marga / nama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit(e);
                }
              }}
              className="bg-transparent border-none text-white text-sm outline-none w-48 md:w-64 placeholder-zinc-500 font-poppins"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveSearchQuery("");
                }}
                className="text-xs text-zinc-500 hover:text-white px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="ml-2 bg-[#8B0000] text-white hover:bg-[#A30000] text-xs font-semibold px-2.5 py-1 rounded-lg transition cursor-pointer"
            >
              Cari
            </button>
          </div>
        </div>

        {/* Right Side: Navigation Filters & Layout Toggle */}
        <div className="flex flex-wrap gap-2.5 pointer-events-auto items-center">
          
          {/* Branch Lineage Filter */}
          <div className="flex items-center bg-black/60 border border-zinc-800/80 backdrop-blur-md rounded-xl p-1 text-xs">
            <button
              onClick={() => setSelectedLineage("all")}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedLineage === "all"
                  ? "bg-zinc-800 text-[#D4AF37] font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setSelectedLineage("gurutatea")}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedLineage === "gurutatea"
                  ? "bg-[#D4AF37]/20 text-[#D4AF37] font-semibold border border-[#D4AF37]/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Tatea Bulan
            </button>
            <button
              onClick={() => setSelectedLineage("rajaisombaon")}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedLineage === "rajaisombaon"
                  ? "bg-[#8B0000]/20 text-red-400 font-semibold border border-[#8B0000]/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Isombaon
            </button>
          </div>

          {/* Generation Filter */}
          <div className="flex items-center bg-black/60 border border-zinc-800/80 backdrop-blur-md rounded-xl p-1 text-xs">
            <span className="text-zinc-500 px-2 font-mono text-[10px]">GEN:</span>
            {generationOptions.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGeneration(g)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition uppercase font-semibold text-[10px] ${
                  selectedGeneration === g
                    ? "bg-zinc-800 text-white border border-[#D4AF37]/40"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {g === "all" ? "★" : g}
              </button>
            ))}
          </div>

          {/* Layout Direction Toggle (Vertical vs Horizontal) */}
          <div className="flex items-center bg-black/60 border border-zinc-800/80 backdrop-blur-md rounded-xl p-1 text-xs">
            <button
              onClick={() => setLayoutDirection("TB")}
              className={`px-3 py-1 rounded-lg transition ${
                layoutDirection === "TB"
                  ? "bg-zinc-800 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Vertikal
            </button>
            <button
              onClick={() => setLayoutDirection("LR")}
              className={`px-3 py-1 rounded-lg transition ${
                layoutDirection === "LR"
                  ? "bg-zinc-800 text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Horisontal
            </button>
          </div>

        </div>
      </div>

      {/* REACT FLOW CANVAS CONTAINER */}
      <div className="flex-1 w-full h-full relative z-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          zoomOnScroll={true}
          zoomOnDoubleClick={false}
          panOnDrag={true}
          defaultViewport={{ x: window.innerWidth / 2 - nodeWidth / 2, y: 100, zoom: 0.65 }}
          minZoom={0.05}
          maxZoom={2}
          fitViewOptions={{ padding: 0.15 }}
        >
          {/* Custom subtle visual background grid */}
          <Background color="rgba(139, 0, 0, 0.15)" gap={30} size={1} />
          
          <MiniMap
            nodeStrokeColor={(n) => (n.data.isHighlighted ? "#eab308" : "#8B0000")}
            nodeColor={(n) => "rgba(17, 17, 17, 0.95)"}
            nodeBorderRadius={8}
            maskColor="rgba(0, 0, 0, 0.7)"
            style={{
              backgroundColor: "rgba(17, 17, 17, 0.8)",
              border: "1px solid rgba(139, 0, 0, 0.25)",
              borderRadius: "12px",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)"
            }}
            className="bottom-[180px] right-6 hidden md:block"
          />
        </ReactFlow>
      </div>

      {/* FLOATING ACTION PANEL (Zoom & Controls bottom left) */}
      <div className="absolute bottom-6 left-6 z-10 flex gap-2.5">
        <button
          onClick={() => reactFlowInstance.zoomIn({ duration: 300 })}
          className="w-10 h-10 rounded-xl bg-black/70 border border-zinc-800 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-black/90 transition shadow flex items-center justify-center cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => reactFlowInstance.zoomOut({ duration: 300 })}
          className="w-10 h-10 rounded-xl bg-black/70 border border-zinc-800 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-black/90 transition shadow flex items-center justify-center cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleFitView}
          className="w-10 h-10 rounded-xl bg-black/70 border border-zinc-800 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-black/90 transition shadow flex items-center justify-center cursor-pointer"
        >
          <Maximize className="w-4 h-4" />
        </button>
        
        {/* Quick Instructions badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-4 rounded-xl bg-black/50 border border-zinc-800 text-[10px] text-zinc-500 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span>DRAG CANVAS UNTUK NAVIGASI • KLIK KARTU UNTUK PROFIL</span>
        </div>
      </div>

      {/* Decorative repeating Gorga line at the very bottom separator */}
      <GorgaBorder height={14} className="border-t border-[#8B0000]/10" />
    </section>
  );
}

// Wrap inside ReactFlowProvider so useReactFlow hooks execute correctly
export default function FamilyTreeWrapper(props) {
  return (
    <ReactFlowProvider>
      <FamilyTree {...props} />
    </ReactFlowProvider>
  );
}
