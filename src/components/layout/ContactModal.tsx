'use client';

import { useState } from 'react';
import { Modal, Button } from '@/components/ui';
import { getTranslation, type Language } from '@/translations';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

export function ContactModal({ isOpen, onClose, currentLanguage }: ContactModalProps) {
  const t = getTranslation(currentLanguage);
  const [copied, setCopied] = useState(false);

  const contactOptions = [
    {
      id: 'whatsapp',
      label: t.whatsapp,
      desc: t.whatsappDesc,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.472.099-.174.05-.369-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.377-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.679m-5.421 7.402h-.004a9.87 9.87 0 01-5.031-1.378 9.86 9.86 0 01-.399-.445l-.5-.475-3.084.863.899-3.187-.484-.505a9.89 9.89 0 01-.435-.39 9.876 9.876 0 01-1.37-5.042c0-5.444 4.434-9.877 9.884-9.877 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c0 5.443-4.434 9.877-9.884 9.877zm-7.94-1.143" />
        </svg>
      ),
      href: 'https://whatsapp.com/channel/0029VbChyDUI1rcht5jajL3q',
      action: () => window.open('https://whatsapp.com/channel/0029VbChyDUI1rcht5jajL3q', '_blank'),
    },
    {
      id: 'sms',
      label: t.sms,
      desc: t.smsDesc,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      action: () => window.open('sms:+255796339436', '_self'),
      phone: '+255 796 339 436',
    },
    {
      id: 'email',
      label: t.email,
      desc: t.emailDesc,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: 'mailto:gamesiteonlinetz@gmail.com',
      action: () => window.open('mailto:gamesiteonlinetz@gmail.com', '_self'),
    },
    {
      id: 'telegram',
      label: t.telegram,
      desc: t.telegramDesc,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 1.581a.822.822 0 0 0-.672 0L.589 7.065a.822.822 0 0 0 0 1.487l1.368 3.182 4.892-1.293c.462-.12.87.308.803.757l-.36 2.416c-.04.27.27.52.54.42l2.49-1.065a.822.822 0 0 0 .37-.46L17.77 5.06a.822.822 0 0 0-.024-1.322l-4.894-4.158Z" />
        </svg>
      ),
      href: 'https://t.me/faliz_AI',
      action: () => window.open('https://t.me/faliz_AI', '_blank'),
    },
  ];

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+255796339436');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.contactUs}
      size="md"
    >
      <p className="brutal-text mb-6">{t.contactOptions}</p>
      
      <div className="grid gap-4">
        {contactOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              option.action();
              if (option.id !== 'sms') onClose();
            }}
            className="brutal-card dark:brutal-card-dark border-brutal-border dark:border-brutal-border-dark border-brutal p-4 text-left shadow-brutal hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1 transition-all duration-100 flex items-center gap-4 group"
          >
            <div className="brutal-card-dark border-brutal-border-dark border-brutal p-3 shadow-brutal-sm">
              {option.icon}
            </div>
            <div className="flex-1">
              <p className="brutal-heading-4">{option.label}</p>
              <p className="brutal-text-sm text-brutal-fg/60 dark:text-brutal-fgDark/60">{option.desc}</p>
            </div>
            <svg className="w-5 h-5 text-brutal-fg/40 dark:text-brutal-fgDark/40 group-hover:text-brutal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      {/* SMS-specific phone number with copy */}
      <div className="mt-6 p-4 brutal-card-dark border-brutal-border-dark border-brutal">
        <div className="flex items-center justify-between">
          <div>
            <p className="brutal-heading-4">{t.sms}</p>
            <p className="brutal-mono text-lg font-mono font-bold">{t.phoneNumber}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyPhone}
            className="whitespace-nowrap"
          >
            {copied ? t.copied : t.copyPhone}
          </Button>
        </div>
      </div>
    </Modal>
  );
}