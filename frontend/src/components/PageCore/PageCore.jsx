import React, { useState, useEffect, useRef } from "react";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Image,
  Circle,
  Transformer,
} from "react-konva";
import { v4 as uuidv4 } from "uuid";
import sendData from "../../hooks/sendHTML";
import Header from "../Layout/Header/Header";

const CanvaEditor = () => {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const fileInputRef = useRef(null);
  const bgFileInputRef = useRef(null);
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [videoElement, setVideoElement] = useState(null);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [lockAspectRatio, setLockAspectRatio] = useState(false);
  const [imageCache, setImageCache] = useState({});
  const [textEditorVisible, setTextEditorVisible] = useState(false);
  const [editingText, setEditingText] = useState({
    id: null,
    text: "",
    fontSize: 20,
    fontFamily: "Arial",
    fill: "#000000",
  });
  const [background, setBackground] = useState({
    type: "color",
    value: "#ffffff",
    image: null,
    imageObj: null,
    fit: "cover", // cover, contain, or stretch
  });
  const [bgSettingsVisible, setBgSettingsVisible] = useState(false);
  const [emotionPickerVisible, setEmotionPickerVisible] = useState(false);
  const { sendHtml } = sendData();

  // Common emotion emojis for quick access
  const emotionEmojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🙃",
    "😉",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "😚",
    "😙",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
    "🤭",
    "🤫",
    "🤔",
    "🤐",
    "🤨",
    "😐",
    "😑",
    "😶",
    "😏",
    "😒",
    "🙄",
    "😬",
    "🤥",
    "😌",
    "😔",
    "😪",
    "🤤",
    "😴",
    "😷",
    "🤒",
    "🤕",
    "🤢",
    "🤮",
    "🤧",
    "🥵",
    "🥶",
    "🥴",
    "😵",
    "🤯",
    "🤠",
    "🥳",
    "😎",
    "🤓",
    "🧐",
    "😕",
    "😟",
    "🙁",
    "☹️",
    "😮",
    "😯",
    "😲",
    "😳",
    "🥺",
    "😦",
    "😧",
    "😨",
    "😰",
    "😥",
    "😢",
    "😭",
    "😱",
    "😖",
    "😣",
    "😞",
    "😓",
    "😩",
    "😫",
    "🥱",
    "😤",
    "😡",
    "😠",
    "🤬",
    "😈",
    "👿",
    "💀",
    "☠️",
    "💩",
    "🤡",
    "👹",
    "👺",
    "👻",
    "👽",
    "👾",
    "🤖",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🤎",
    "🖤",
    "🤍",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
    "💌",
  ];

  // Handle window resize to make the stage responsive
  useEffect(() => {
    const handleResize = () => {
      setStageSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Create a video element that can be used later
    const video = document.createElement("video");
    video.src =
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"; // Sample video
    video.addEventListener("loadedmetadata", () => {
      setVideoElement(video);
    });
  }, []);

  // Update transformer when selected node changes
  useEffect(() => {
    if (selectedId === null) {
      transformerRef.current.nodes([]);
      return;
    }

    // Find the selected node by id
    const selectedNode = stageRef.current.findOne("#" + selectedId);
    if (selectedNode) {
      transformerRef.current.nodes([selectedNode]);
    }
  }, [selectedId]);

  // Set up drag and drop for images
  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDrop = (e) => {
      e.preventDefault();

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.match("image.*")) {
          handleImageFile(file, e.clientX, e.clientY);
        }
      }
    };

    const stageContainer = stageRef.current?.container();
    if (stageContainer) {
      stageContainer.addEventListener("dragover", handleDragOver);
      stageContainer.addEventListener("drop", handleDrop);
    }

    return () => {
      if (stageContainer) {
        stageContainer.removeEventListener("dragover", handleDragOver);
        stageContainer.removeEventListener("drop", handleDrop);
      }
    };
  }, [stageRef.current]);

  const checkDeselect = (e) => {
    // Clicked on empty area of the stage
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  const addRectangle = () => {
    const newElement = {
      id: uuidv4(),
      type: "rectangle",
      x: stageSize.width / 2 - 50,
      y: stageSize.height / 2 - 50,
      width: 100,
      height: 100,
      fill: getRandomColor(),
      isDragging: false,
      rotation: 0,
      cornerRadius: 0, // Add corner radius property with default value 0
    };
    setElements([...elements, newElement]);
    setSelectedId(newElement.id);
  };

  const addCircle = () => {
    const newElement = {
      id: uuidv4(),
      type: "circle",
      x: stageSize.width / 2,
      y: stageSize.height / 2,
      radius: 50,
      fill: getRandomColor(),
      isDragging: false,
      rotation: 0,
    };
    setElements([...elements, newElement]);
    setSelectedId(newElement.id);
  };

  const addText = () => {
    const newElement = {
      id: uuidv4(),
      type: "text",
      x: stageSize.width / 2 - 75,
      y: stageSize.height / 2 - 15,
      text: "Double click to edit",
      fontSize: 20,
      fontFamily: "Arial",
      fill: "#000000",
      width: 150,
      height: 30,
      isDragging: false,
      rotation: 0,
    };
    setElements([...elements, newElement]);
    setSelectedId(newElement.id);
  };

  const addEmoji = (emoji) => {
    const newElement = {
      id: uuidv4(),
      type: "text",
      x: stageSize.width / 2 - 25,
      y: stageSize.height / 2 - 25,
      text: emoji,
      fontSize: 50,
      fontFamily: "Arial",
      fill: "#000000",
      width: 50,
      height: 50,
      isDragging: false,
      rotation: 0,
    };
    setElements([...elements, newElement]);
    setSelectedId(newElement.id);
    setEmotionPickerVisible(false);
  };

  const addVideo = () => {
    if (!videoElement) return;

    const newElement = {
      id: uuidv4(),
      type: "video",
      x: stageSize.width / 2 - 160,
      y: stageSize.height / 2 - 90,
      width: 320,
      height: 180,
      isDragging: false,
      videoSrc: videoElement.src,
      rotation: 0,
    };
    setElements([...elements, newElement]);
    setSelectedId(newElement.id);

    // Start playing the video
    videoElement.play();
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleBackgroundImageUpload = () => {
    bgFileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.match("image.*")) {
        // Center the image on the canvas
        handleImageFile(file, stageSize.width / 2, stageSize.height / 2);
      }
      // Reset the file input
      e.target.value = null;
    }
  };

  const handleBgFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.match("image.*")) {
        // Set as background
        handleBackgroundImage(file);
      }
      // Reset the file input
      e.target.value = null;
    }
  };

  const handleBackgroundImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageObj = new window.Image();
      imageObj.src = event.target.result;

      imageObj.onload = () => {
        setBackground({
          type: "image",
          value: event.target.result,
          image: event.target.result,
          imageObj: imageObj,
          fit: background.fit,
        });
        // Open background settings after setting a new background
        setBgSettingsVisible(true);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleImageFile = (file, x, y) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageObj = new window.Image();
      imageObj.src = event.target.result;

      imageObj.onload = () => {
        // Calculate size to fit within a reasonable area while maintaining aspect ratio
        const maxWidth = 400;
        const maxHeight = 300;

        let width = imageObj.width;
        let height = imageObj.height;

        if (width > maxWidth) {
          const scale = maxWidth / width;
          width = maxWidth;
          height = height * scale;
        }

        if (height > maxHeight) {
          const scale = maxHeight / height;
          height = maxHeight;
          width = width * scale;
        }

        // Create image element
        const imageId = uuidv4();
        const newElement = {
          id: imageId,
          type: "image",
          x: x - width / 2,
          y: y - height / 2,
          width: width,
          height: height,
          isDragging: false,
          rotation: 0,
          imageSrc: event.target.result,
        };

        // Cache the image object for use by Konva
        setImageCache((prev) => ({
          ...prev,
          [imageId]: imageObj,
        }));

        setElements((prev) => [...prev, newElement]);
        setSelectedId(imageId);
      };
    };
    reader.readAsDataURL(file);
  };

  const getRandomColor = () => {
    const colors = [
      "#ff5252",
      "#ff4081",
      "#e040fb",
      "#7c4dff",
      "#536dfe",
      "#448aff",
      "#40c4ff",
      "#18ffff",
      "#64ffda",
      "#69f0ae",
      "#b2ff59",
      "#eeff41",
      "#ffff00",
      "#ffd740",
      "#ffab40",
      "#ff6e40",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleDragStart = (e) => {
    const id = e.target.id();
    setElements(
      elements.map((el) => {
        return {
          ...el,
          isDragging: el.id === id,
        };
      })
    );
  };

  const handleDragEnd = (e) => {
    setElements(
      elements.map((el) => {
        return {
          ...el,
          isDragging: false,
          ...(el.id === e.target.id() && {
            x: e.target.x(),
            y: e.target.y(),
          }),
        };
      })
    );
  };

  const handleTransformEnd = (e) => {
    // Get the transform node
    const node = e.target;
    const id = node.id();

    // Find the element
    const element = elements.find((el) => el.id === id);
    if (!element) return;

    // Get new properties from the node
    const newProps = {
      x: node.x(),
      y: node.y(),
      rotation: node.rotation(),
    };

    // Add specific properties based on element type
    if (
      element.type === "rectangle" ||
      element.type === "text" ||
      element.type === "video" ||
      element.type === "image"
    ) {
      newProps.width = node.width() * node.scaleX();
      newProps.height = node.height() * node.scaleY();
    } else if (element.type === "circle") {
      // For circles, use the average of scaleX and scaleY to maintain roundness
      const averageScale = (node.scaleX() + node.scaleY()) / 2;
      newProps.radius = element.radius * averageScale;
    }

    // Update the element with new properties
    setElements(
      elements.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            ...newProps,
            // Reset scale to 1 as we applied it to width/height
            scaleX: 1,
            scaleY: 1,
          };
        }
        return el;
      })
    );
  };

  const handleTextDblClick = (e) => {
    const id = e.target.id();
    // Find the text element
    const textElement = elements.find(
      (el) => el.id === id && el.type === "text"
    );
    if (!textElement) return;

    // Open the text editor popup with the current text values
    setEditingText({
      id: textElement.id,
      text: textElement.text,
      fontSize: textElement.fontSize,
      fontFamily: textElement.fontFamily,
      fill: textElement.fill,
    });
    setTextEditorVisible(true);
  };

  const handleTextChange = (e) => {
    setEditingText({
      ...editingText,
      text: e.target.value,
    });
  };

  const handleFontSizeChange = (e) => {
    setEditingText({
      ...editingText,
      fontSize: Number(e.target.value),
    });
  };

  const handleFontFamilyChange = (e) => {
    setEditingText({
      ...editingText,
      fontFamily: e.target.value,
    });
  };

  const handleTextColorChange = (e) => {
    setEditingText({
      ...editingText,
      fill: e.target.value,
    });
  };

  const applyTextChanges = () => {
    if (editingText.id) {
      setElements(
        elements.map((el) => {
          if (el.id === editingText.id) {
            return {
              ...el,
              text: editingText.text,
              fontSize: editingText.fontSize,
              fontFamily: editingText.fontFamily,
              fill: editingText.fill,
            };
          }
          return el;
        })
      );
    }
    // Close the text editor
    setTextEditorVisible(false);
  };

  const cancelTextChanges = () => {
    // Just close the editor without applying changes
    setTextEditorVisible(false);
  };

  // Function to update the corner radius of a rectangle
  const updateRectangleCornerRadius = (id, radius) => {
    setElements(
      elements.map((el) => {
        if (el.id === id && el.type === "rectangle") {
          return {
            ...el,
            cornerRadius: radius,
          };
        }
        return el;
      })
    );
  };

  const handleBackgroundColorChange = (e) => {
    setBackground({
      ...background,
      type: "color",
      value: e.target.value,
    });
  };

  const handleBackgroundFitChange = (e) => {
    setBackground({
      ...background,
      fit: e.target.value,
    });
  };

  const removeBackground = () => {
    setBackground({
      type: "color",
      value: "#ffffff",
      image: null,
      imageObj: null,
      fit: "cover",
    });
    setBgSettingsVisible(false);
  };

  const exportToHTML = () => {
    // Create HTML content based on the elements
    let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas Export</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
        }
        .canvas-container {
            position: relative;
            width: ${stageSize.width}px;
            height: ${stageSize.height}px;
            ${
              background.type === "color"
                ? `background-color: ${background.value};`
                : `background-image: url('${background.image}');
                 background-size: ${
                   background.fit === "cover"
                     ? "cover"
                     : background.fit === "contain"
                     ? "contain"
                     : "100% 100%"
                 };
                 background-position: center;
                 background-repeat: no-repeat;`
            }
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .element {
            position: absolute;
            transform-origin: center center;
        }
    </style>
</head>
<body>
    <div class="canvas-container">
`;

    // Add each element to the HTML
    elements.forEach((element) => {
      const rotation = element.rotation
        ? `transform: rotate(${element.rotation}deg);`
        : "";

      if (element.type === "rectangle") {
        htmlContent += `
        <div class="element" style="
            left: ${element.x}px;
            top: ${element.y}px;
            width: ${element.width}px;
            height: ${element.height}px;
            background-color: ${element.fill};
            border-radius: ${element.cornerRadius || 0}px;
            ${rotation}
        "></div>
`;
      } else if (element.type === "circle") {
        htmlContent += `
        <div class="element" style="
            left: ${element.x - element.radius}px;
            top: ${element.y - element.radius}px;
            width: ${element.radius * 2}px;
            height: ${element.radius * 2}px;
            background-color: ${element.fill};
            border-radius: 50%;
            ${rotation}
        "></div>
`;
      } else if (element.type === "text") {
        htmlContent += `
        <div class="element" style="
            left: ${element.x}px;
            top: ${element.y}px;
            font-size: ${element.fontSize}px;
            font-family: ${element.fontFamily};
            color: ${element.fill};
            width: ${element.width}px;
            ${rotation}
        ">${element.text}</div>
`;
      } else if (element.type === "video") {
        htmlContent += `
        <video class="element" style="
            left: ${element.x}px;
            top: ${element.y}px;
            width: ${element.width}px;
            height: ${element.height}px;
            ${rotation}
        " controls>
            <source src="${element.videoSrc}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
`;
      } else if (element.type === "image") {
        htmlContent += `
        <img class="element" src="${element.imageSrc}" style="
            left: ${element.x}px;
            top: ${element.y}px;
            width: ${element.width}px;
            height: ${element.height}px;
            ${rotation}
        " alt="Uploaded image">
`;
      }
    });

    // Close the HTML document
    htmlContent += `
    </div>
</body>
</html>
`;

    // // Create a Blob with the HTML content
    // const blob = new Blob([htmlContent], { type: 'text/html' });

    // // Create a download link
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'canvas-export.html';

    // Trigger the download
    // document.body.appendChild(a);
    // a.click();

    sendHtml("dramatique", htmlContent);

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  const toggleToolbar = () => {
    setToolbarVisible(!toolbarVisible);
  };

  const toggleAspectRatio = () => {
    setLockAspectRatio(!lockAspectRatio);
  };

  const toggleBackgroundSettings = () => {
    setBgSettingsVisible(!bgSettingsVisible);
  };

  const toggleEmotionPicker = () => {
    setEmotionPickerVisible(!emotionPickerVisible);
  };

  const deleteSelected = () => {
    if (selectedId) {
      setElements(elements.filter((el) => el.id !== selectedId));
      setSelectedId(null);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if modals are open
      if (textEditorVisible || bgSettingsVisible || emotionPickerVisible)
        return;

      // Delete key or backspace
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        deleteSelected();
      }

      // Escape key to deselect
      if (e.key === "Escape") {
        setSelectedId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedId,
    elements,
    textEditorVisible,
    bgSettingsVisible,
    emotionPickerVisible,
  ]);

  // Get the selected element
  const selectedElement = elements.find((el) => el.id === selectedId);

  // Calculate background dimensions for proper rendering
  const renderBackgroundImage = () => {
    if (background.type !== "image" || !background.imageObj) return null;

    let imgWidth = background.imageObj.width;
    let imgHeight = background.imageObj.height;
    let x = 0;
    let y = 0;
    let width = stageSize.width;
    let height = stageSize.height;

    if (background.fit === "cover") {
      // Cover: scale the image to cover the entire container while maintaining aspect ratio
      const scale = Math.max(width / imgWidth, height / imgHeight);
      imgWidth *= scale;
      imgHeight *= scale;
      x = (width - imgWidth) / 2;
      y = (height - imgHeight) / 2;
    } else if (background.fit === "contain") {
      // Contain: scale the image to fit inside the container while maintaining aspect ratio
      const scale = Math.min(width / imgWidth, height / imgHeight);
      imgWidth *= scale;
      imgHeight *= scale;
      x = (width - imgWidth) / 2;
      y = (height - imgHeight) / 2;
    } else {
      // Stretch: stretch the image to fit the container exactly
      imgWidth = width;
      imgHeight = height;
    }

    return (
      <Image
        x={x}
        y={y}
        width={imgWidth}
        height={imgHeight}
        image={background.imageObj}
      />
    );
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-100 text-gray-500">
      <div className="fixed w-full top-0 z-10">
        <Header />
      </div>
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
      <input
        type="file"
        ref={bgFileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleBgFileChange}
      />

      {/* Text Editor Popup */}
      {textEditorVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Edit Text
            </h2>

            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-1">
                Text Content
              </div>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                value={editingText.text}
                onChange={handleTextChange}
                placeholder="Enter your text here"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Font Size
                </div>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingText.fontSize}
                  onChange={handleFontSizeChange}
                  min="8"
                  max="72"
                />
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Font Family
                </div>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingText.fontFamily}
                  onChange={handleFontFamilyChange}
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Impact">Impact</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-1">
                Text Color
              </div>
              <div className="flex items-center">
                <input
                  type="color"
                  className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                  value={editingText.fill}
                  onChange={handleTextColorChange}
                />
                <span className="ml-2 text-gray-700">{editingText.fill}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={cancelTextChanges}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={applyTextChanges}
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background Settings Popup */}
      {bgSettingsVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Background Settings
            </h2>

            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-1">
                Background Type
              </div>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-md ${
                    background.type === "color"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() =>
                    setBackground({ ...background, type: "color" })
                  }
                >
                  Color
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    background.type === "image"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => {
                    if (background.image) {
                      setBackground({ ...background, type: "image" });
                    } else {
                      handleBackgroundImageUpload();
                    }
                  }}
                >
                  Image
                </button>
              </div>
            </div>

            {background.type === "color" && (
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Background Color
                </div>
                <div className="flex items-center">
                  <input
                    type="color"
                    className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                    value={background.value}
                    onChange={handleBackgroundColorChange}
                  />
                  <span className="ml-2 text-gray-700">{background.value}</span>
                </div>
              </div>
            )}

            {background.type === "image" && (
              <>
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Image Fit
                  </div>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={background.fit}
                    onChange={handleBackgroundFitChange}
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="stretch">Stretch</option>
                  </select>
                </div>

                <div className="mb-4">
                  <button
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={handleBackgroundImageUpload}
                  >
                    Change Background Image
                  </button>
                </div>
              </>
            )}

            <div className="mb-6">
              <button
                className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={removeBackground}
              >
                Remove Background
              </button>
            </div>

            <div className="flex items-center justify-end">
              <button
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() => setBgSettingsVisible(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emotion Emoji Picker */}
      {emotionPickerVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-4 w-[500px] max-w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Emotion Emojis
              </h2>
              <button
                className="p-1 rounded-full hover:bg-gray-200"
                onClick={() => setEmotionPickerVisible(false)}
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Emotion emoji grid */}
            <div className="flex-1 overflow-y-auto p-2 border border-gray-200 rounded-md grid grid-cols-8 gap-2">
              {emotionEmojis.map((emoji, index) => (
                <button
                  key={index}
                  className="text-2xl h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded"
                  onClick={() => addEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
              Click on an emoji to add it to your canvas
            </div>
          </div>
        </div>
      )}

      {/* Floating toolbar */}
      <div
        className={`absolute top-4 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-300 ${
          toolbarVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg p-2 flex space-x-2">
          <button
            onClick={addRectangle}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
            title="Add Rectangle"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" strokeWidth="2" />
            </svg>
          </button>

          <button
            onClick={addCircle}
            className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full"
            title="Add Circle"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
            </svg>
          </button>

          <button
            onClick={addText}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
            title="Add Text"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            onClick={toggleEmotionPicker}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
            title="Add Emotion"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <button
            onClick={handleImageUpload}
            className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full"
            title="Upload Image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>

          <button
            onClick={addVideo}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
            title="Add Video"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>

          <div className="border-l border-gray-300 mx-1 h-8"></div>

          <button
            onClick={toggleBackgroundSettings}
            className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full"
            title="Background Settings"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
          </button>

          <button
            onClick={toggleAspectRatio}
            className={`${
              lockAspectRatio ? "bg-indigo-600" : "bg-gray-500"
            } hover:bg-indigo-700 text-white p-2 rounded-full`}
            title={
              lockAspectRatio ? "Unlock Aspect Ratio" : "Lock Aspect Ratio"
            }
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {lockAspectRatio ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              )}
            </svg>
          </button>

          <button
            onClick={deleteSelected}
            className={`bg-gray-700 hover:bg-gray-800 text-white p-2 rounded-full ${
              !selectedId ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Delete Selected"
            disabled={!selectedId}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>

          <div className="border-l border-gray-300 mx-1 h-8"></div>

          <button
            onClick={exportToHTML}
            className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full"
            title="Export to HTML"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Toggle toolbar button */}
      <button
        onClick={toggleToolbar}
        className="absolute top-4 right-4 z-20 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
        title={toolbarVisible ? "Hide Toolbar" : "Show Toolbar"}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {toolbarVisible ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      {/* Element properties panel - only shown when an element is selected */}
      {selectedElement &&
        !textEditorVisible &&
        !bgSettingsVisible &&
        !emotionPickerVisible && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 z-10">
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-xs text-gray-500">Size</span>
                <div className="flex items-center space-x-2">
                  {selectedElement.type === "circle" ? (
                    <div className="flex items-center">
                      <span className="text-xs mr-1">R:</span>
                      <input
                        type="number"
                        className="w-16 px-2 py-1 border rounded text-sm"
                        value={Math.round(selectedElement.radius)}
                        onChange={(e) => {
                          const newRadius = Number(e.target.value);
                          if (newRadius > 0) {
                            setElements(
                              elements.map((el) => {
                                if (el.id === selectedId) {
                                  return {
                                    ...el,
                                    radius: newRadius,
                                  };
                                }
                                return el;
                              })
                            );
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <span className="text-xs mr-1">W:</span>
                        <input
                          type="number"
                          className="w-16 px-2 py-1 border rounded text-sm"
                          value={Math.round(selectedElement.width)}
                          onChange={(e) => {
                            const newWidth = Number(e.target.value);
                            if (newWidth > 0) {
                              setElements(
                                elements.map((el) => {
                                  if (el.id === selectedId) {
                                    const newProps = { width: newWidth };

                                    // If aspect ratio is locked, adjust height proportionally
                                    if (lockAspectRatio) {
                                      const ratio = el.height / el.width;
                                      newProps.height = newWidth * ratio;
                                    }

                                    return {
                                      ...el,
                                      ...newProps,
                                    };
                                  }
                                  return el;
                                })
                              );
                            }
                          }}
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs mr-1">H:</span>
                        <input
                          type="number"
                          className="w-16 px-2 py-1 border rounded text-sm"
                          value={Math.round(selectedElement.height)}
                          onChange={(e) => {
                            const newHeight = Number(e.target.value);
                            if (newHeight > 0) {
                              setElements(
                                elements.map((el) => {
                                  if (el.id === selectedId) {
                                    const newProps = { height: newHeight };

                                    // If aspect ratio is locked, adjust width proportionally
                                    if (lockAspectRatio) {
                                      const ratio = el.width / el.height;
                                      newProps.width = newHeight * ratio;
                                    }

                                    return {
                                      ...el,
                                      ...newProps,
                                    };
                                  }
                                  return el;
                                })
                              );
                            }
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-500">Rotation</span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-16 px-2 py-1 border rounded text-sm"
                    value={Math.round(selectedElement.rotation || 0)}
                    onChange={(e) => {
                      const newRotation = Number(e.target.value);
                      setElements(
                        elements.map((el) => {
                          if (el.id === selectedId) {
                            return {
                              ...el,
                              rotation: newRotation,
                            };
                          }
                          return el;
                        })
                      );
                    }}
                  />
                  <span className="text-xs ml-1">°</span>
                </div>
              </div>

              {/* Add corner radius control for rectangles */}
              {selectedElement.type === "rectangle" && (
                <div>
                  <span className="text-xs text-gray-500">Corner Radius</span>
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="w-16 px-2 py-1 border rounded text-sm"
                      value={selectedElement.cornerRadius || 0}
                      onChange={(e) => {
                        const newRadius = Math.max(0, Number(e.target.value));
                        updateRectangleCornerRadius(selectedId, newRadius);
                      }}
                      min="0"
                      max={Math.min(
                        selectedElement.width / 2,
                        selectedElement.height / 2
                      )}
                    />
                    <span className="text-xs ml-1">px</span>
                  </div>
                </div>
              )}

              {(selectedElement.type === "rectangle" ||
                selectedElement.type === "circle") && (
                <div>
                  <span className="text-xs text-gray-500">Color</span>
                  <div className="flex items-center">
                    <input
                      type="color"
                      className="w-8 h-8 border rounded cursor-pointer"
                      value={selectedElement.fill}
                      onChange={(e) => {
                        setElements(
                          elements.map((el) => {
                            if (el.id === selectedId) {
                              return {
                                ...el,
                                fill: e.target.value,
                              };
                            }
                            return el;
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              )}

              {selectedElement.type === "text" && (
                <div>
                  <button
                    onClick={() =>
                      handleTextDblClick({
                        target: { id: () => selectedElement.id },
                      })
                    }
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  >
                    Edit Text
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Full-screen stage */}
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        className="bg-white"
      >
        <Layer>
          {/* Background */}
          <Rect
            x={0}
            y={0}
            width={stageSize.width}
            height={stageSize.height}
            fill={
              background.type === "color" ? background.value : "transparent"
            }
          />

          {/* Background image if present */}
          {renderBackgroundImage()}

          {/* Render all elements */}
          {elements.map((element) => {
            const isSelected = element.id === selectedId;

            if (element.type === "rectangle") {
              return (
                <Rect
                  key={element.id}
                  id={element.id}
                  x={element.x}
                  y={element.y}
                  width={element.width}
                  height={element.height}
                  fill={element.fill}
                  cornerRadius={element.cornerRadius || 0} // Apply corner radius
                  draggable
                  rotation={element.rotation}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedId(element.id)}
                  onTap={() => setSelectedId(element.id)}
                  onTransformEnd={handleTransformEnd}
                  shadowColor="black"
                  shadowBlur={isSelected ? 10 : 0}
                  shadowOpacity={isSelected ? 0.6 : 0}
                  shadowOffset={{
                    x: isSelected ? 5 : 0,
                    y: isSelected ? 5 : 0,
                  }}
                />
              );
            } else if (element.type === "circle") {
              return (
                <Circle
                  key={element.id}
                  id={element.id}
                  x={element.x}
                  y={element.y}
                  radius={element.radius}
                  fill={element.fill}
                  draggable
                  rotation={element.rotation}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedId(element.id)}
                  onTap={() => setSelectedId(element.id)}
                  onTransformEnd={handleTransformEnd}
                  shadowColor="black"
                  shadowBlur={isSelected ? 10 : 0}
                  shadowOpacity={isSelected ? 0.6 : 0}
                  shadowOffset={{
                    x: isSelected ? 5 : 0,
                    y: isSelected ? 5 : 0,
                  }}
                />
              );
            } else if (element.type === "text") {
              return (
                <Text
                  key={element.id}
                  id={element.id}
                  x={element.x}
                  y={element.y}
                  text={element.text}
                  fontSize={element.fontSize}
                  fontFamily={element.fontFamily}
                  fill={element.fill}
                  width={element.width}
                  height={element.height}
                  draggable
                  rotation={element.rotation}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedId(element.id)}
                  onTap={() => setSelectedId(element.id)}
                  onDblClick={handleTextDblClick}
                  onDblTap={handleTextDblClick}
                  onTransformEnd={handleTransformEnd}
                  shadowColor="black"
                  shadowBlur={isSelected ? 10 : 0}
                  shadowOpacity={isSelected ? 0.6 : 0}
                  shadowOffset={{
                    x: isSelected ? 5 : 0,
                    y: isSelected ? 5 : 0,
                  }}
                />
              );
            } else if (element.type === "video" && videoElement) {
              return (
                <Image
                  key={element.id}
                  id={element.id}
                  x={element.x}
                  y={element.y}
                  width={element.width}
                  height={element.height}
                  image={videoElement}
                  draggable
                  rotation={element.rotation}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedId(element.id)}
                  onTap={() => setSelectedId(element.id)}
                  onTransformEnd={handleTransformEnd}
                  shadowColor="black"
                  shadowBlur={isSelected ? 10 : 0}
                  shadowOpacity={isSelected ? 0.6 : 0}
                  shadowOffset={{
                    x: isSelected ? 5 : 0,
                    y: isSelected ? 5 : 0,
                  }}
                />
              );
            } else if (element.type === "image" && imageCache[element.id]) {
              return (
                <Image
                  key={element.id}
                  id={element.id}
                  x={element.x}
                  y={element.y}
                  width={element.width}
                  height={element.height}
                  image={imageCache[element.id]}
                  draggable
                  rotation={element.rotation}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedId(element.id)}
                  onTap={() => setSelectedId(element.id)}
                  onTransformEnd={handleTransformEnd}
                  shadowColor="black"
                  shadowBlur={isSelected ? 10 : 0}
                  shadowOpacity={isSelected ? 0.6 : 0}
                  shadowOffset={{
                    x: isSelected ? 5 : 0,
                    y: isSelected ? 5 : 0,
                  }}
                />
              );
            }

            return null;
          })}

          {/* Transformer for resizing elements */}
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              // Limit minimum size
              if (newBox.width < 10 || newBox.height < 10) {
                return oldBox;
              }

              // If aspect ratio is locked, ensure it's maintained
              if (lockAspectRatio && selectedElement) {
                // Skip for circles as they maintain aspect ratio naturally
                if (selectedElement.type !== "circle") {
                  const aspectRatio = oldBox.width / oldBox.height;

                  // Check which dimension changed more
                  const widthChange = Math.abs(newBox.width - oldBox.width);
                  const heightChange = Math.abs(newBox.height - oldBox.height);

                  if (widthChange > heightChange) {
                    // Width changed more, adjust height based on width
                    newBox.height = newBox.width / aspectRatio;
                  } else {
                    // Height changed more, adjust width based on height
                    newBox.width = newBox.height * aspectRatio;
                  }
                }
              }

              return newBox;
            }}
            keepRatio={
              selectedElement &&
              (selectedElement.type === "circle" ||
                (lockAspectRatio && selectedElement.type === "image"))
            }
            enabledAnchors={
              selectedElement && selectedElement.type === "circle"
                ? ["top-left", "top-right", "bottom-left", "bottom-right"]
                : [
                    "top-left",
                    "top-center",
                    "top-right",
                    "middle-right",
                    "middle-left",
                    "bottom-left",
                    "bottom-center",
                    "bottom-right",
                  ]
            }
            rotateEnabled={true}
            rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
            rotationSnapTolerance={15}
          />
        </Layer>
      </Stage>

      {/* Quick access buttons */}
      <div className="absolute bottom-16 left-4 flex flex-col space-y-2">
        {/* Background button hint - only shown when no background image is set */}
        {background.type === "color" &&
          !bgSettingsVisible &&
          !emotionPickerVisible &&
          !textEditorVisible && (
            <button
              className="bg-teal-500 text-white text-xs rounded-full px-4 py-2 cursor-pointer hover:bg-teal-600 flex items-center"
              onClick={toggleBackgroundSettings}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Set Background
            </button>
          )}

        {/* Emotions button hint */}
        {!emotionPickerVisible && !bgSettingsVisible && !textEditorVisible && (
          <button
            className="bg-yellow-500 text-white text-xs rounded-full px-4 py-2 cursor-pointer hover:bg-yellow-600 flex items-center"
            onClick={toggleEmotionPicker}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add Emotion
          </button>
        )}
      </div>

      {/* Drag & drop hint */}
      <div className="absolute bottom-16 right-4 bg-black bg-opacity-70 text-white text-xs rounded-full px-4 py-2">
        Drag & drop images here
      </div>

      {/* Help tooltip */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-xs rounded-full px-4 py-2">
        Click to select • Drag to move • Resize with handles • Double-click text
        to edit
      </div>
    </div>
  );
};

export default CanvaEditor;
