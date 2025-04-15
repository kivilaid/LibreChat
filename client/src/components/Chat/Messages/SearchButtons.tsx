import { Link } from 'lucide-react';
import type { TMessage } from 'librechat-data-provider';
import { useLocalize, useNavigateToConvo } from '~/hooks';
import { findConversationInInfinite } from '~/utils';

export default function SearchButtons({ message }: { message: TMessage }) {
  const localize = useLocalize();
  const { navigateWithLastTools } = useNavigateToConvo();
  const conversationId = message.conversationId ?? '';

  if (!conversationId) {
    return null;
  }

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const conversation = findConversationInInfinite(conversationId);
    if (!conversation) {
      return;
    }

    document.title = message.title ?? '';
    navigateWithLastTools(conversation, true, true);
  };

  return (
    <div className="visible mt-0 flex items-center justify-center gap-1 self-end text-text-secondary lg:justify-start">
      <button
        className="ml-0 flex cursor-pointer items-center gap-1.5 rounded-md p-1 text-xs hover:text-text-primary hover:underline"
        onClick={clickHandler}
        title={localize('com_ui_go_to_conversation')}
      >
        <Link className="icon-sm" />
        {message.title}
      </button>
    </div>
  );
}
