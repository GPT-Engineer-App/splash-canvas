import React, { useRef, useState, useEffect } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import { SketchPicker } from "react-color";

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
  };

  const mondrianColors = ["#000000", "#FF0000", "#FFFF00", "#0000FF", "#FFFFFF"];

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ display: "block" }}
      />
      <HStack position="absolute" top="10px" left="10px" spacing={2}>
        {mondrianColors.map((mondrianColor) => (
          <Button
            key={mondrianColor}
            backgroundColor={mondrianColor}
            width="40px"
            height="40px"
            onClick={() => setColor(mondrianColor)}
          />
        ))}
      </HStack>
    </Box>
  );
};

export default Index;