import React from 'react';

export function TopAd({ script }: { script?: string }) {
  if (!script) return (
    <div className="bg-gray-100 py-4 text-center text-xs text-gray-400 border-dashed border-2">
      TOP AD SLOT (Google Ads)
    </div>
  );
  return <div dangerouslySetInnerHTML={{ __html: script }} />;
}

export function SidebarAd({ script }: { script?: string }) {
  if (!script) return (
    <div className="bg-gray-100 h-64 flex items-center justify-center text-xs text-gray-400 border-dashed border-2 rounded-xl">
      SIDEBAR AD SLOT
    </div>
  );
  return <div dangerouslySetInnerHTML={{ __html: script }} />;
}

export function InFeedAd({ script }: { script?: string }) {
  if (!script) return (
    <div className="bg-[#FDFDEA] border-2 border-[#FFC857] p-6 rounded-xl text-center text-xs text-gray-400 border-dashed">
      IN-FEED NATIVE AD SLOT
    </div>
  );
  return <div dangerouslySetInnerHTML={{ __html: script }} />;
}
