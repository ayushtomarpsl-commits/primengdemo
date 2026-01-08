// ============================================
// Truncate Pipe
// Truncates text to specified length
// ============================================

import { Pipe, PipeTransform } from '@angular/core';
import { truncate } from '../utils/string.util';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, maxLength = 50, suffix = '...'): string {
    if (!value) return '';
    return truncate(value, maxLength, suffix);
  }
}

