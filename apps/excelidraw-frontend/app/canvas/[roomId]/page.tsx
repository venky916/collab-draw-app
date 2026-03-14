import Canvas from "@/components/Canvas";
interface PageProps {
  params: Promise<{ roomId: string }>; // must be Promise type
}
// This is async server component — can read params directly
const CanvasPage = async ({ params }: PageProps) => {
  const { roomId } = await params;

  return <Canvas roomId={roomId} />;
};

export default CanvasPage;
