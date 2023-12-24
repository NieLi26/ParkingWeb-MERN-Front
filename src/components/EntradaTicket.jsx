import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import React, { useState, useEffect } from "react"
import useParking from '../hooks/useParking';
import { formatearFechaAbreviada, formatearTiempo } from '../helpers';

Font.register({
    family: 'Roboto',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf', fontWeight: 400 },
        { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TzBhc9.ttf', fontWeight: 700 }
    ]
  }
  )

// Create styles
const styles = StyleSheet.create({
    page: {
        width: '58mm',
        height: '100m',
        margin: 0,
        padding: '5px 10px',
        fontFamily: 'Roboto',
        fontWeight: 400,
    },
    p: {
        fontSize: '5px'
    },
    textCenter: {
        textAlign: 'center',
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: '9px',
        fontWeight: 700,
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: 0
    },
    client: {
        fontSize: '9px',
        padding: '5px 0',
        marginBottom: '5px',
    },
    subtitle: {
        fontFamily: 'Roboto',
        borderBottom: '2px dotted #000',
        textAlign: 'center',
        fontSize: '9px',
        fontWeight: 700,
        textTransform: 'uppercase',
        padding: '5px 0'
    },
    footer: {
        fontFamily: 'Roboto',
        fontWeight: 700,
        fontSize: '7px',
        padding: '5px 0',
        textAlign: 'center', 
        borderBottom: '2px dotted #000',
        borderTop: '2px dotted #000',
    },
    verification: {
        fontSize: '11px',
        marginTop: 0,
        marginBottom: '5px',
        padding: 0,
        textAlign: 'center'
    }
});
  

const EntradaTicket = ({ reserva }) => {

    return (
        <Document>
            <Page size="A7" >
                <View style={{ padding: '10px' }}>
                    <View style={{ textAlign: 'center' }}>
                        <View style={{ paddingBottom: '5px', borderBottom: '2px dotted #000', }}>
                            <Text style={styles.title}>ticket de entrada</Text>
                            <Text style={styles.title}>estacionamiento</Text>
                        </View>
                        <View
                            style={styles.subtitle}
                        >
                            <Text>comercial c & m spa</Text>
                            <Text>manuel mont 140 - lautaro.</Text>
                            <Text>rut: 77.585.694-7</Text>
                            <Text>fono: +56968330602</Text>
                        </View>
                    </View>
                    
                    <View style={styles.client}>
                        <Text><Text style={{   fontFamily: 'Roboto', fontWeight: 700 }}>NO. Ticket:</Text> { reserva?._id } </Text> 
                        <Text><Text style={{   fontFamily: 'Roboto', fontWeight: 700 }} >NO. Estacionamiento:</Text> { reserva?.lote?.numero }</Text> 
                        <Text><Text style={{   fontFamily: 'Roboto', fontWeight: 700 }} >Patente:</Text> { reserva?.patente } </Text> 
                        <Text><Text style={{   fontFamily: 'Roboto', fontWeight: 700 }} >Fecha Ingreso:</Text> { reserva && formatearFechaAbreviada(reserva.entrada) }</Text> 
                        <Text><Text style={{   fontFamily: 'Roboto', fontWeight: 700 }} >Hora Ingreso:</Text> { reserva && formatearTiempo(reserva.entrada) }</Text> 
                    </View>

                    <View style={styles.textCenter} >
                        <Text style={styles.verification}>
                            &quot;Este ticket es su comprobante de ingreso para que 
                            pueda verificar los datos de entrada con su vehículo.
                            porfavor no lo pierda.&quot;
                        </Text>
                        <View style={styles.footer}>
                            <Text>Muchas gracias por confiar en nosotros.</Text>
                            <Text>Que tenga excelente día.</Text>
                        </View>
                    </View>

                </View>
            </Page>
        </Document>
    )
}

export default EntradaTicket