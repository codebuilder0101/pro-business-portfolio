import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { Link } from '@tiptap/extension-link';

const FONT_OPTIONS = [
  { label: 'Default', value: '' },
  { label: 'Serif', value: 'Georgia, serif' },
  { label: 'Sans', value: 'Arial, sans-serif' },
  { label: 'Mono', value: 'Menlo, Consolas, monospace' },
  { label: 'Playfair', value: '"Playfair Display", serif' }
];

const COLOR_OPTIONS = ['#111827', '#374151', '#c8a86b', '#b45309', '#1d4ed8', '#047857', '#be123c'];

function ToolbarButton({ onClick, active, title, children, disabled }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      disabled={disabled}
      style={{
        border: '1px solid #ddd',
        background: active ? '#111827' : '#fff',
        color: active ? '#fff' : '#111827',
        padding: '6px 10px',
        borderRadius: 6,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 13,
        minWidth: 32,
        opacity: disabled ? 0.5 : 1
      }}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange, placeholder = 'Escreva o conteúdo...' }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      TextStyle,
      Color,
      FontFamily,
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' } })
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'rte-content',
        style: 'min-height: 260px; padding: 14px 16px; outline: none;'
      }
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html === '<p></p>' ? '' : html);
    }
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || '';
    if (next !== current && !(next === '' && current === '<p></p>')) {
      editor.commands.setContent(next || '', { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const handleLink = () => {
    const prev = editor.getAttributes('link').href || '';
    const url = window.prompt('URL do link', prev);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, background: '#fff' }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 6, padding: 10,
        borderBottom: '1px solid #eee', background: '#fafafa', borderTopLeftRadius: 8, borderTopRightRadius: 8
      }}>
        <ToolbarButton title="Desfazer" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <i className="fas fa-undo"></i>
        </ToolbarButton>
        <ToolbarButton title="Refazer" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <i className="fas fa-redo"></i>
        </ToolbarButton>

        <span style={separator} />

        <ToolbarButton title="Negrito" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </ToolbarButton>
        <ToolbarButton title="Itálico" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </ToolbarButton>
        <ToolbarButton title="Sublinhado" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>U</u>
        </ToolbarButton>
        <ToolbarButton title="Tachado" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <s>S</s>
        </ToolbarButton>

        <span style={separator} />

        <ToolbarButton title="Título H2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
        <ToolbarButton title="Título H3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
        <ToolbarButton title="Parágrafo" active={editor.isActive('paragraph')} onClick={() => editor.chain().focus().setParagraph().run()}>P</ToolbarButton>

        <span style={separator} />

        <ToolbarButton title="Lista" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <i className="fas fa-list-ul"></i>
        </ToolbarButton>
        <ToolbarButton title="Lista numerada" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <i className="fas fa-list-ol"></i>
        </ToolbarButton>
        <ToolbarButton title="Citação" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <i className="fas fa-quote-right"></i>
        </ToolbarButton>

        <span style={separator} />

        <select
          title="Fonte"
          onChange={(e) => {
            const v = e.target.value;
            if (v) editor.chain().focus().setFontFamily(v).run();
            else editor.chain().focus().unsetFontFamily().run();
          }}
          value={editor.getAttributes('textStyle').fontFamily || ''}
          style={{ border: '1px solid #ddd', borderRadius: 6, padding: '5px 8px', fontSize: 13, background: '#fff' }}
        >
          {FONT_OPTIONS.map((f) => <option key={f.label} value={f.value}>{f.label}</option>)}
        </select>

        <div title="Cor do texto" style={{ display: 'flex', alignItems: 'center', gap: 4, border: '1px solid #ddd', borderRadius: 6, padding: '3px 6px', background: '#fff' }}>
          <i className="fas fa-palette" style={{ fontSize: 12, color: '#666' }}></i>
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().setColor(c).run()}
              title={c}
              style={{ width: 16, height: 16, borderRadius: 3, border: '1px solid #ccc', background: c, cursor: 'pointer', padding: 0 }}
            />
          ))}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().unsetColor().run()}
            title="Remover cor"
            style={{ border: '1px solid #ccc', borderRadius: 3, background: '#fff', fontSize: 10, padding: '0 4px', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        <span style={separator} />

        <ToolbarButton title="Link" active={editor.isActive('link')} onClick={handleLink}>
          <i className="fas fa-link"></i>
        </ToolbarButton>
        <ToolbarButton title="Limpar formatação" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
          <i className="fas fa-eraser"></i>
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
      {!value && (
        <div style={{ position: 'relative', height: 0 }}>
          <span style={{ position: 'absolute', top: -230, left: 16, color: '#bbb', pointerEvents: 'none' }}>{placeholder}</span>
        </div>
      )}
    </div>
  );
}

const separator = { width: 1, background: '#e5e5e5', margin: '2px 2px' };
