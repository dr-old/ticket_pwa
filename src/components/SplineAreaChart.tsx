import React, { useEffect, useRef, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart: any = CanvasJSReact.CanvasJSChart;

const SplineAreaChart: React.FC = () => {
  const chart = useRef<any>(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleDataSeries = (e: any) => {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.current.render();
  };

  const options = {
    theme: theme === "light" ? "light2" : "dark2",
    backgroundColor: "transparent",
    animationEnabled: true,
    title: {
      text: "",
    },
    axisY: {
      includeZero: false,
      gridColor: "rgb(229 231 235)",
      lineColor: "rgb(229 231 235)",
      thickColor: "rgb(229 231 235)",
    },
    data: [
      {
        name: "Today",
        type: "splineArea",
        color: "#3851ff",
        fillOpacity: 0.1,
        lineColor: "#3851ff",
        markerColor: "#3851ff",
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0.##",
        showInLegend: false,
        dataPoints: [
          { x: new Date(2000, 0), y: 0 },
          { x: new Date(2001, 0), y: 20 },
          { x: new Date(2002, 0), y: 81 },
          { x: new Date(2003, 0), y: 20 },
          { x: new Date(2004, 0), y: 32 },
          { x: new Date(2005, 0), y: 25 },
          { x: new Date(2006, 0), y: 17 },
          { x: new Date(2007, 0), y: 18 },
          { x: new Date(2008, 0), y: 35 },
          { x: new Date(2009, 0), y: 19 },
          { x: new Date(2010, 0), y: 21 },
          { x: new Date(2011, 0), y: 24 },
          { x: new Date(2012, 0), y: 32 },
          { x: new Date(2013, 0), y: 59 },
          { x: new Date(2014, 0), y: 72 },
          { x: new Date(2015, 0), y: 68 },
          { x: new Date(2016, 0), y: 29 },
          { x: new Date(2017, 0), y: 38 },
        ],
      },
      {
        name: "Yesterday",
        type: "splineArea",
        color: "rgb(148 163 184)",
        fillOpacity: 0.1,
        lineColor: "rgb(148 163 184)",
        markerColor: "rgb(148 163 184)",
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0.##",
        showInLegend: false,
        dataPoints: [
          { x: new Date(2000, 0), y: 0 },
          { x: new Date(2001, 0), y: 6 },
          { x: new Date(2002, 0), y: 8 },
          { x: new Date(2003, 0), y: 10 },
          { x: new Date(2004, 0), y: 12 },
          { x: new Date(2005, 0), y: 15 },
          { x: new Date(2006, 0), y: 17 },
          { x: new Date(2007, 0), y: 18 },
          { x: new Date(2008, 0), y: 25 },
          { x: new Date(2009, 0), y: 18 },
          { x: new Date(2010, 0), y: 24 },
          { x: new Date(2011, 0), y: 29 },
          { x: new Date(2012, 0), y: 31 },
          { x: new Date(2013, 0), y: 52 },
          { x: new Date(2014, 0), y: 72 },
          { x: new Date(2015, 0), y: 63 },
          { x: new Date(2016, 0), y: 20 },
          { x: new Date(2017, 0), y: 18 },
        ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        onRef={(ref: any) => (chart.current = ref)}
      />
    </div>
  );
};

export default SplineAreaChart;
