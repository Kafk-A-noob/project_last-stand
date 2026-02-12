
import ViewerLayout from "./components/layout/ViewerLayout";
import ViewCanvas from "./components/canvas/ViewCanvas"

export default function Home() {
  return (
    // <ViewerLayout> で包む
    <ViewerLayout>
      <ViewCanvas />
    </ViewerLayout>
  );
}
