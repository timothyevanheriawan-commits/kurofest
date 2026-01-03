import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 20,
                    background: '#1a1a1a', // Sumi-950
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f5f5f0', // Washi-100
                    border: '2px solid #f5f5f0',
                    position: 'relative',
                }}
            >
                {/* Kanji */}
                <div style={{ fontFamily: 'serif', marginTop: '-2px' }}>黒</div>

                {/* Red Accent Dot */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '6px',
                        height: '6px',
                        background: '#dc2626', // Shu-600
                    }}
                />
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}