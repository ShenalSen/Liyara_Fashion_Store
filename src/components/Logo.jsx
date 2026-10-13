import { Link } from '../router.jsx';
import { Bloom } from './Icons.jsx';

export default function Logo({ inverse = false }) {
  return (
    <Link to="/" className={'logo' + (inverse ? ' logo--inverse' : '')} aria-label="Liyara home">
      <span className="logo__word">Liyara</span>
      <Bloom size={16} />
    </Link>
  );
}
