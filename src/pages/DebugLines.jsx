import FloatingLines from '../components/FloatingLines';

const DebugLines = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000000', position: 'relative' }}>
        <h1 style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', zIndex: 100, fontFamily: 'monospace' }}>
            Lines Debug Page
        </h1>
        <FloatingLines 
            enabledWaves={["middle","bottom"]}
            lineCount={5}
            lineDistance={58.5}
            bendRadius={26}
            bendStrength={15}
            interactive={true}
            parallax={true}
            linesGradient={['#8b5cf6', '#ffffff', '#8b5cf6']}
        />
    </div>
  );
};

export default DebugLines;
