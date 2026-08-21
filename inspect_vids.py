import cv2

def capture_frame(video_path, output_path):
    cap = cv2.VideoCapture(video_path)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(output_path, frame)
        h, w, _ = frame.shape
        print(f"{video_path}: {w}x{h} saved to {output_path}")
    else:
        print(f"Failed to read {video_path}")
    cap.release()

capture_frame('assets/girl.mp4', 'girl_frame.png')
capture_frame('assets/boy.mp4', 'boy_frame.png')
