import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TiptapEditorProps {
    content: string;
    setContent: (content: string) => void;
}

export const Editor: React.FC<TiptapEditorProps> = ({ content, setContent }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content, // Initialize editor with the content
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML()); // Update content state on editor update
        },
    });

    useEffect(() => {
        if (editor) {
            editor.commands.setContent(content); // Update editor content if it changes
        }
    }, [content, editor]);

    return (
        <EditorContent editor={editor} />
    );
};


