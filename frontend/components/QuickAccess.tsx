import React from 'react';
import { Card } from 'antd';

import Link from 'next/link';

interface QuickAccessProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  fontsize?: string;
  backgroundColor?: string;
}

export const QuickAccess = ({ icon, text, href, backgroundColor }: QuickAccessProps) => {
  return (
    <Link href={href}>
      <Card className={`flex flex-col items-center mb-6 w-32 h-24 shadow-md ${backgroundColor}`}>
        <div className={`flex flex-col items-center justify-center mt-1`}>
          {icon}
        </div>
        <div className="text-center">{text}</div>
      </Card>
    </Link>
  );
};
