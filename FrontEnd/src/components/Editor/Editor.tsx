// Editor.tsx
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react'; // Assuming you're using Tiptap
import StarterKit from '@tiptap/starter-kit';

interface EditorProps {
  content: string; // Prop for passing content to the editor
}

const Editor: React.FC<EditorProps> = ({ content }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content, // Initial content
  });

  return (
    <div className="editor">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;

