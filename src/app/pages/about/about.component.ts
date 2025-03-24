import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-about',
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Sobre el Proyecto</h2>
      <section>
        <h3>Acerca de mí</h3>
        <p>
          Soy Iván Navarro Roldán, desarrollador web apasionado por las nuevas tecnologías y con experiencia en el desarrollo de aplicaciones front-end. Me formé en el ciclo de Desarrollo de Aplicaciones Web y he participado en varios proyectos académicos y personales, donde he aprendido a aplicar tecnologías modernas como Angular para crear aplicaciones interactivas y escalables.
        </p>
      </section>
      <section>
        <h3>Descripción y Feedback</h3>
        <p>
          Para el Proyecto Pokémon se desarrolló una aplicación cliente en Angular que consume la API pública de PokeAPI. La aplicación cuenta con:
        </p>
        <ul>
          <li>Un listado paginado de Pokémon.</li>
          <li>Un buscador para filtrar por nombre.</li>
          <li>Una vista de detalle para cada Pokémon.</li>
        </ul>
        <p>
          Todo ello integrado en una interfaz sencilla pero funcional, con navegación manual (sin routing) mediante componentes standalone y eventos para cambiar de vista.
        </p>
        <p><strong>Pros:</strong></p>
        <ul>
          <li>Componentes standalone que simplifican la estructura y favorecen la reutilización.</li>
          <li>Consumo directo de PokeAPI y navegación manual clara.</li>
          <li>Código modular que facilita el mantenimiento y la escalabilidad.</li>
        </ul>
        <p><strong>Contras y Desafíos:</strong></p>
        <ul>
          <li>La navegación manual puede limitar la escalabilidad en proyectos más complejos.</li>
          <li>El manejo de eventos sin routing y la configuración de assets (logo y sprites) supusieron retos importantes.</li>
        </ul>
      </section>
      <button (click)="goBack()">Volver al listado</button>
    </div>
  `,
  styles: [`
    .container {
      padding: 1rem;
    }
    section {
      margin-bottom: 1rem;
    }
    ul {
      margin: 0 0 1rem 1rem;
    }
    button {
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  `]
})
export class AboutComponent {
  @Output() back = new EventEmitter<void>();

  goBack(): void {
    this.back.emit();
  }
}
