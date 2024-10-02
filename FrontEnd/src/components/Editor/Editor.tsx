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
        content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && editor.getHTML() !== content) {
            editor.commands.setContent(content, false); // Set content without triggering an update
        }
    }, [content, editor]);

    return <EditorContent editor={editor} />;
};
