"use client";

import useLang from "./useLang";
import { cloneElement, isValidElement, Fragment } from "react";

const normalizeQuotes = (str) => {
  if (typeof str !== "string") return str;
  return str
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[“”‘’'"]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
};

export default function AutoTranslate({ children }) {
  const { dict } = useLang();

  const translateNode = (node) => {
    // Metin ise çevir
    if (typeof node === "string") {
      const normalizedNode = normalizeQuotes(node);
      for (const key of Object.keys(dict)) {
        if (normalizeQuotes(key) === normalizedNode) {
          return dict[key];
        }
      }
      return dict[node] || node;
    }

    // Dizi ise (map)
    if (Array.isArray(node)) {
      return node.map((child, index) => {
        const translated = translateNode(child);
        if (isValidElement(translated)) {
          return cloneElement(translated, { key: translated.key ?? index });
        }
        return <Fragment key={index}>{translated}</Fragment>;
      });
    }

    // React element ise içini recursive çevir
    if (isValidElement(node)) {
      const props = { ...node.props };
      if (typeof props.placeholder === "string") {
        props.placeholder = dict[props.placeholder] || props.placeholder;
      }
      if (typeof props.title === "string") {
        props.title = dict[props.title] || props.title;
      }
      if (typeof props.description === "string") {
        props.description = dict[props.description] || props.description;
      }
      if (typeof props.label === "string") {
        props.label = dict[props.label] || props.label;
      }
      
      // dangerouslySetInnerHTML desteği
      if (props.dangerouslySetInnerHTML && typeof props.dangerouslySetInnerHTML.__html === "string") {
        let htmlContent = props.dangerouslySetInnerHTML.__html;
        let normalizedHtml = normalizeQuotes(htmlContent);
        
        const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
        for (const key of keys) {
          const normalizedKey = normalizeQuotes(key);
          if (normalizedHtml.includes(normalizedKey)) {
            // Tırnak işaretlerini esnek regex gruplarına dönüştürerek her türlü tırnağı ve entity'yi yakala
            const escapedKey = key
              .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
              .replace(/[“”‘’'"]/g, '(?:[“”‘’\'"]|&quot;|&ldquo;|&rdquo;|&#39;|&#34;)');
            const regex = new RegExp(escapedKey, 'g');
            htmlContent = htmlContent.replace(regex, dict[key]);
            normalizedHtml = normalizeQuotes(htmlContent);
          }
        }
        props.dangerouslySetInnerHTML = { __html: htmlContent };
      }

      return cloneElement(node, {
        ...props,
        children: translateNode(node.props.children),
      });
    }

    // Diğer durumlar (null, undefined vs.)
    return node;
  };

  return <>{translateNode(children)}</>;
}
