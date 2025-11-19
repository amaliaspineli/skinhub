import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CosmeticsService } from './services/cosmetics.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-component-root',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    allCosmetics: any[] = [];
    filteredCosmetics: any[] = [];
    cosmetics: any[] = [];

    // Controle
    loading = false;
    page = 1;
    limit = 35;

    // Filtros
    searchName = '';
    type = '';
    rarity = '';
    startDate = '';
    endDate = '';
    onlyNew = false;
    onlyShop = false;
    onlyDiscount = false;

    constructor(
        private cosmeticsService: CosmeticsService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.loadCosmetics();
    }

    loadCosmetics() {
        const that = this;
        this.loading = true;
        this.cosmeticsService.getAll().subscribe({
            next: (res) => {
                console.log('res getall: ', res);
                that.allCosmetics = res.data;
                that.applyFilters();
                that.loading = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                console.error(err);
                that.loading = false;
                this.cdr.markForCheck();
            }
        });
    }

    applyFilters() {
        let result = [...this.allCosmetics];

        // Nome
        if (this.searchName.trim() !== '') {
            const query = this.searchName.toLowerCase();
            result = result.filter(c => c.name?.toLowerCase().includes(query));
        }

        // Tipo
        if (this.type) {
            result = result.filter(c => c.type?.value === this.type);
        }

        // Raridade
        if (this.rarity) {
            result = result.filter(c => c.rarity?.value === this.rarity);
        }

        // Data
        if (this.startDate || this.endDate) {
            result = result.filter(c => {
                const added = new Date(c.added?.date);
                const start = this.startDate ? new Date(this.startDate) : new Date('1900');
                const end = this.endDate ? new Date(this.endDate) : new Date();
                return added >= start && added <= end;
            });
        }

        // Apenas novos
        if (this.onlyNew) {
            result = result.filter(c => c.new === true);
        }

        // À venda
        if (this.onlyShop) {
            result = result.filter(c => c.shopHistory && c.shopHistory.length > 0);
        }

        // Em promoção (simulação, pois a API nem sempre tem preços)
        if (this.onlyDiscount) {
            result = result.filter(c => c.price && c.regularPrice && c.price < c.regularPrice);
        }

        // remove os que não tiverem imagem
        result = result.filter(c => c.images && c.images.icon);

        this.filteredCosmetics = result;
        this.page = 1;
        this.updatePage();
    }

    updatePage() {
        const start = (this.page - 1) * this.limit;
        const end = start + this.limit;
        this.cosmetics = this.filteredCosmetics.slice(start, end);
    }

    nextPage() {
        if (this.page * this.limit < this.filteredCosmetics.length) {
            this.page++;
            this.updatePage();
        }
    }

    prevPage() {
        if (this.page > 1) {
            this.page--;
            this.updatePage();
        }
    }

    get totalPages(): number {
        return Math.ceil(this.filteredCosmetics.length / this.limit);
    }

    resetFilters() {
        this.searchName = '';
        this.type = '';
        this.rarity = '';
        this.startDate = '';
        this.endDate = '';
        this.onlyNew = false;
        this.onlyShop = false;
        this.onlyDiscount = false;
        this.applyFilters();
    }
}
