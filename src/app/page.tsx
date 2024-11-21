'use client'

import { useState } from 'react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  BookOpenText, 
  Calendar, 
  GraduationCap 
} from "lucide-react"
import GradeTable from "@/components/GradeTable"

export default function Dashboard() {
    const [selectedVariant, setSelectedVariant] = useState<string>('');
    const [selectedWeek, setSelectedWeek] = useState<string>('');

    return (
        <div className="container mx-auto max-w-6xl">
            <Card className="w-full shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                    <div className="flex items-center space-x-4">
                        <GraduationCap className="w-10 h-10 text-blue-600" />
                        <CardTitle className="text-2xl font-bold text-gray-800">
                            Calc<span className='text-blue-700'>Grade</span>
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <BookOpenText className="mr-2 w-5 h-5 text-blue-500" />
                                Варианты таблицы
                            </label>
                            <Select onValueChange={setSelectedVariant}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Выберите вариант таблицы" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="first">Сро/Пратика</SelectItem>
                                    <SelectItem value="second">Лекция/Сро/Пратика</SelectItem>
                                    <SelectItem value="third">Лекция/Сро/Lab/Пратика</SelectItem>
                                    <SelectItem value="four">Лекция/Сро/Lab</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Calendar className="mr-2 w-5 h-5 text-blue-500" />
                                Варинаты недели
                            </label>
                            <Select onValueChange={setSelectedWeek}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Выберите неделю" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="first">1-7 неделя (РК1)</SelectItem>
                                    <SelectItem value="second">8-15 неделя(РК2)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {selectedVariant && selectedWeek ? (
                        <GradeTable variant={selectedVariant} week={selectedWeek} />
                    ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <p className="text-gray-500">
                                Пожалуйста выберите вариант таблицы и неделю что бы увидеть оценку
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}