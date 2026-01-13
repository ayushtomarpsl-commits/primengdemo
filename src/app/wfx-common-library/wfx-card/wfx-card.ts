import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';

/**
 * WfxCard - A wrapper component for PrimeNG Card
 * 
 * This component exposes all p-card properties and provides
 * a consistent API for the WFX application.
 * 
 * @example
 * <wfx-card header="Title" subheader="Subtitle">
 *   <p>Card content goes here</p>
 * </wfx-card>
 */
@Component({
  selector: 'wfx-card',
  standalone: true,
  imports: [CommonModule, Card],
  templateUrl: './wfx-card.html',
  styleUrl: './wfx-card.scss',
})
export class WfxCard {
  // ==================== BASIC PROPERTIES ====================

  /**
   * Header of the card.
   */
  @Input() header: string | undefined;

  /**
   * Subheader of the card.
   */
  @Input() subheader: string | undefined;

  // ==================== STYLING PROPERTIES ====================

  /**
   * Inline style of the element.
   */
  @Input() style: { [klass: string]: any } | undefined;

  /**
   * Class of the element.
   */
  @Input() styleClass: string | undefined;

  // ==================== PASS THROUGH ====================

  /**
   * Used to pass attributes to DOM elements inside the component.
   */
  @Input() pt: any;

  /**
   * Used to configure passthrough(pt) options of the component.
   */
  @Input() ptOptions: any;

  /**
   * Defines scoped design tokens of the component.
   */
  @Input() dt: object | undefined;

  /**
   * Indicates whether the component should be rendered without styles.
   * @default false
   */
  @Input() unstyled: boolean = false;
}

