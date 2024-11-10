import React, { Dispatch, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'

interface TiptapEditorProps {
    content: string;
    setContent: (content: string) => void;
    setEditor: Dispatch<any>; 
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

