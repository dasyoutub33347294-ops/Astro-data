import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './TarotCategorySelector.css';

const TarotCategorySelector = ({ onSelect }) => {
  const [selected, setSelected] = useState(null);
  const { t } = useLanguage();

  const categories = [
    { id: 'general', icon: '🌌', labelKey: 'general' },
    { id: 'love', icon: '💕', labelKey: 'love' },
    { id: 'career', icon: '💼', labelKey: 'career' },
    { id: 'growth', icon: '🌱', labelKey: 'growth' }
  ];

  const handleSelect = (id) => {
    setSelected(id);
    if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <div className="tarot-category-container">
      <h2 className="category-title">{t.tarot.title}</h2>
      <p className="category-subtitle">{t.tarot.pick_card}</p>

      <div className="category-grid">
        {categories.map((cat, index) => (
          <button
            key={cat.id}
            className={`category-item animate-slide-up ${selected === cat.id ? 'active' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleSelect(cat.id)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-label">{t.tarot.categories[cat.labelKey]}</span>
            {selected === cat.id && <div className="active-ring"></div>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TarotCategorySelector;
