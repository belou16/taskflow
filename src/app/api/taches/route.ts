import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../db/prisma";

// Récupérer toutes les taches
export async function GET() {
  try {
    const taches = await prisma.tACHES.findMany({
      orderBy: { date_limite: "asc" },
    });

    return NextResponse.json(taches);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des taches" },
      { status: 500 },
    );
  }
}

// Créer une nouvelle tache
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const titre = body.titre;
    const date_limite = body.date_limite;
    const priorite = body.priorite;
    const status = body.status;

    // On vérifie que tous les champs sont bien remplis
    if (!titre || !date_limite || !priorite || !status) {
      return NextResponse.json(
        { error: "titre, date_limite, priorite et status sont requis" },
        { status: 400 },
      );
    }

    const nouvelleTache = await prisma.tACHES.create({
      data: {
        titre: titre,
        date_limite: new Date(date_limite),
        priorite: priorite,
        status: status,
      },
    });

    return NextResponse.json(nouvelleTache, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la tache" },
      { status: 500 },
    );
  }
}
