import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CosmeticsService } from '../services/cosmetics.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-cosmetics-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './cosmetics-detail.component.html',
    styleUrls: ['./cosmetics-detail.component.scss']
})
export class CosmeticsDetailComponent implements OnInit {
    cosmetic: any = null;
    loading = true;
    error: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private cosmeticsService: CosmeticsService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (!id) {
            this.error = 'ID inválido.';
            this.loading = false;
            this.cdr.markForCheck();
            return;
        }

        this.fetchCosmetic(id);
    }

    fetchCosmetic(id: string): void {
        this.loading = true;
        this.error = null;

        this.cosmeticsService.getCosmeticById(id).subscribe({
            next: (response) => {
                this.cosmetic = response.data;

                if (!this.cosmetic) {
                    this.error = 'Nenhum dado encontrado para esse cosmético.';
                }

                this.loading = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                console.error('Erro na requisição:', err);
                this.error = 'Erro ao carregar dados do cosmético.';
                this.loading = false;
                this.cdr.markForCheck();
            }
        });
    }

    formatDate(date: string): string {
        return new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    }

}
